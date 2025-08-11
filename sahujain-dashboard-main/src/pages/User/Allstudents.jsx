import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStudents } from "../../features/personalInfo/personalInfoSlice";

const Allstudents = () => {
    const dispatch = useDispatch();
    const { students, loading, error } = useSelector(
        (state) => state.personalInfo
    );

    useEffect(() => {
        dispatch(fetchAllStudents());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2>All Students</h2>
            {students.length === 0 ? (
                <p>No students found</p>
            ) : (
                <table
                    border="1"
                    cellPadding="8"
                    style={{ borderCollapse: "collapse", width: "100%" }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th>S.No</th>
                            <th>Application ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => {
                            const name = student.personalInfo
                                ? `${student.personalInfo.firstName} ${student.personalInfo.lastName}`
                                : "N/A";
                            const email =
                                student.personalInfo?.email || student.email || "N/A";
                            const mobileNumber =
                                student.personalInfo?.mobileNumber || student.mobileNumber || "N/A";
                            return (
                                <tr key={student._id}>
                                    <td>{index + 1}</td>
                                    <td>{student.applicationId}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{mobileNumber}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Allstudents;
