import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4 mb-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
          Home
          </Link>
          <Link to="/dashboard" className="text-blue-600 hover:text-green-800 font-semibold">
          Dashboard
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Home route - your test content */}
        <Route path="/" element={
          <>
            <div className="text-3xl font-bold text-blue-600 text-center mt-10">
              🚀 Tailwind is working!
              <h1> Testing to see if this header is working.</h1>
              <p> Testing to see if this paragraph is working.</p>
            </div>
            <div className="text-1xl font-semibold text-black-300 text-center mt-5">
              Another division.
              {/* Didn't get much done today, need to learn more about what makes a good coder tomorrow and also build more of the app*/}
              {/* Learned today about the structure of an app, what each file in this project does, how they connect together, and learned more about npm syntax*/}
              {/* 10.26.2025 Pushing to stay updated today because I need to work on my Harvard application */}
              <p>Paragraph testing for second division.</p>
            </div>
          </>
        } />
        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}