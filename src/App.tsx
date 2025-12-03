import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/auth/SignInPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentStudentViewPage from './pages/parent/ParentStudentViewPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import SchedulePage from './pages/SchedulePage';
import ResourcesPage from './pages/ResourcesPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import PortalPage from './pages/PortalPage';
import ParentPortalPage from './pages/ParentPortalPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/parent-portal" element={<ParentPortalPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/parent/students/:studentId" element={<ParentStudentViewPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
