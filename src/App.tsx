import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/auth/SignInPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentStudentViewPage from './pages/parent/ParentStudentViewPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/parent/students/:studentId" element={<ParentStudentViewPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
