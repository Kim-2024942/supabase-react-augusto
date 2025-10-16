import React, { useState } from 'react';
import { User, Save, Plus, Edit, ArrowLeft, Search } from 'lucide-react';

// Student Page Component
function StudentPage({ onNavigate, students }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Management</h1>
            <p className="text-gray-600">Manage and view all registered students</p>
          </div>
          <button
            onClick={() => onNavigate('add')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">First Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-indigo-100 p-4 rounded-full">
                          <User className="text-indigo-600" size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">No students found</p>
                        <button
                          onClick={() => onNavigate('add')}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Add your first student
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{student.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.firstName}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.lastName}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          {student.yearLevel} Year
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">KPA</span>
              </div>
              <div className="text-left">
                <p className="text-gray-800 font-semibold text-lg">Kim P. Augusto</p>
                <p className="text-gray-500 text-sm">Student Management System</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
            <p className="text-gray-600 text-sm">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Student Page Component
function AddStudentPage({ onNavigate, onAddStudent }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    yearLevel: '',
    course: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.yearLevel && formData.course) {
      onAddStudent(formData);
      setFormData({
        firstName: '',
        lastName: '',
        yearLevel: '',
        course: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('list')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Students</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Student Management</h1>

        {/* Add Student Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <User className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Add New Student</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select year level</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., BS-IT, BS-CS"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Save size={20} />
              Add Student
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">KPA</span>
              </div>
              <div className="text-left">
                <p className="text-gray-800 font-semibold text-lg">Kim P. Augusto</p>
                <p className="text-gray-500 text-sm">Student Management System</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
            <p className="text-gray-600 text-sm">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component with Polymorphism
export default function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [students, setStudents] = useState([
    { id: 1, firstName: 'KIM', lastName: 'Augusto', yearLevel: '3rd', course: 'BS-IT' },
    { id: 2, firstName: 'KYL', lastName: 'Abregondo', yearLevel: '3rd', course: 'BS-IT' },
    { id: 3, firstName: 'DIRK', lastName: 'Lato', yearLevel: '3rd', course: 'BS-IT' },
  ]);

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: students.length + 1,
      ...studentData
    };
    setStudents([...students, newStudent]);
    setCurrentPage('list');
  };

  // Polymorphic page rendering
  const renderPage = () => {
    switch (currentPage) {
      case 'list':
        return (
          <StudentPage
            onNavigate={setCurrentPage}
            students={students}
          />
        );
      case 'add':
        return (
          <AddStudentPage
            onNavigate={setCurrentPage}
            onAddStudent={handleAddStudent}
          />
        );
      default:
        return null;
    }
  };

  return renderPage();
}