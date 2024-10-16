import React, { useState, useEffect } from "react";
import "./student-list-page.css";
import StudentList from "../../components/listing/student-list/student-list";
import {
  AccountStatusEnum,
  EErrorMessages,
  fetchStudentList,
  toastService,
} from "../../shared";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetchStudentList({
        searchName: debouncedSearchTerm || undefined,
        status: AccountStatusEnum.ACTIVE,
      });
      setStudents(response.content);
    } catch (error) {
      toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [debouncedSearchTerm]);

  const refetch = () => {
    loadStudents();
  };

  return (
    <div className="student-list-page">
      <div className="student-list-search-bar">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-list"
        />
      </div>

      <StudentList
        students={students}
        loading={loading}
        size="full"
        showHeader={false}
        refetch={refetch}
      />
    </div>
  );
};

export default StudentListPage;
