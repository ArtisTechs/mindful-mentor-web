import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { API_URL } from "../enum";
import { STORAGE_KEY } from "../keys";
import { formatDate } from "./date-services";
import { DateFormat } from "../enum/date-format.enum";
import axios from "axios";

const protocol = window.location.protocol === "https:" ? "https" : "http";
const brokerURL = `${protocol}:${API_URL.MAIN_URL}${API_URL.CHAT}`;
const storedToken = localStorage.getItem(STORAGE_KEY.TOKEN);

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.retryInterval = 5000; // Initial retry interval (in milliseconds)
    this.maxRetryInterval = 60000; // Maximum retry interval (1 minute)
    this.subscriptions = {};
  }

  // Establish WebSocket connection
  connect(userId, onMessageReceived) {
    if (!storedToken) {
      console.error("No auth token found!");
      return;
    }

    if (this.stompClient && this.stompClient.connected) {
      console.log("WebSocket client already connected.");
      return;
    }

    // Initialize STOMP Client
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(brokerURL),
      connectHeaders: {
        Authorization: `Bearer ${storedToken}`,
      },
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("WebSocket Connected");
        this.subscribeToPrivateMessages(userId, onMessageReceived);
        // Reset retry interval upon successful connection
        this.retryInterval = 5000;
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame);
        this.retryConnection(userId, onMessageReceived);
      },
      onWebSocketClose: (event) => {
        console.error("WebSocket closed", event);
        this.retryConnection(userId, onMessageReceived);
      },
    });

    // Activate WebSocket connection
    this.stompClient.activate();
  }

  // Subscribe to private messages for a specific user
  subscribeToPrivateMessages(userId, onMessageReceived) {
    const subscriptionPath = `/user/${userId}/topic/messages`;

    if (this.subscriptions[userId]) {
      console.log(`Already subscribed to private messages for user ${userId}`);
      return;
    }

    console.log(`Subscribing to: ${subscriptionPath}`);
    this.subscriptions[userId] = this.stompClient.subscribe(
      subscriptionPath,
      (message) => {
        const newMessage = JSON.parse(message.body);
        onMessageReceived(newMessage);
        console.log("Received private message:", newMessage);
      }
    );
  }

  // Retry connection using exponential backoff
  retryConnection(userId, onMessageReceived) {
    console.log(`Attempting to reconnect in ${this.retryInterval}ms...`);
    setTimeout(() => {
      this.connect(userId, onMessageReceived);
      // Increase retry interval (doubling it) up to max limit
      this.retryInterval = Math.min(
        this.retryInterval * 2,
        this.maxRetryInterval
      );
    }, this.retryInterval);
  }

  // Disconnect the WebSocket client
  disconnect() {
    if (this.stompClient) {
      console.log("Disconnecting WebSocket...");
      this.stompClient.deactivate();
      this.stompClient = null;
      this.subscriptions = {};
    } else {
      console.log("WebSocket client is not connected.");
    }
  }

  // Send a message to a specific receiver
  sendMessage(msg, receiverId, userId, chatToken) {
    if (this.stompClient && this.stompClient.connected && msg.trim()) {
      const messagePayload = {
        senderId: userId,
        receiverId: receiverId,
        chatToken: chatToken,
        content: msg.trim(),
      };

      this.stompClient.publish({
        destination: `/app/sendMessage`, // Backend destination for sending messages
        body: JSON.stringify(messagePayload),
        headers: {},
      });
    } else {
      console.log("WebSocket client not connected or message is empty.");
    }
  }

  // Fetch chat history between two users
  async fetchMessageHistory(senderId, receiverId) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}${API_URL.MESSAGES}/${senderId}/${receiverId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY.TOKEN)}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching message history: ${response.statusText}`
        );
      }

      const messages = await response.json();
      return messages;
    } catch (error) {
      console.error("Failed to fetch message history", error);
      return [];
    }
  }
}

export const webSocketService = new WebSocketService();

export async function getMessagesForReceiver(receiverId) {
  try {
    // Ensure the formatDate function and DateFormat are properly imported and available
    const now = new Date();
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000); // Start date (5 hours ago)
    const fiveHoursFromNow = new Date(now.getTime() + 5 * 60 * 60 * 1000); // End date (5 hours from now)

    // Format both start and end dates to the desired format
    const formattedStartDate = formatDate(
      fiveHoursAgo,
      DateFormat.YYYY_MM_DD_HH_MM_SS
    );
    const formattedEndDate = formatDate(
      fiveHoursFromNow,
      DateFormat.YYYY_MM_DD_HH_MM_SS
    );

    console.log(receiverId);
    console.log(formattedStartDate);
    console.log(formattedEndDate);

    // Log the URL and parameters to verify
    const url = `${API_URL.MAIN_URL}${API_URL.MESSAGES}${API_URL.RECEIVER}/${receiverId}`;
    console.log("Request URL:", url);
    console.log("Request Params:", {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    // Make the axios GET request
    const response = await axios.get(url, {
      params: { startDate: formattedStartDate, endDate: formattedEndDate },
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
    });

    // Check for successful response
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Failed to fetch messages. Status code:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching message history:", error);
    return [];
  }
}

