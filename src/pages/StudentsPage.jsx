import React, { useState, useEffect } from 'react'
import supabase from '../utils/supabase'

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const { data } = await supabase.from("students").select();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <main>
        <pre>{JSON.stringify(students, null, 2)}</pre>
        {students.map((student) => (
          <div key={student.id}>{student.firstName}</div>
        ))}
      </main>
      <div>App</div>
    </>
  );
}