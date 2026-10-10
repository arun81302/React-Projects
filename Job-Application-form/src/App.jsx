import { useState } from 'react';
import Tabs from './components/Tabs';

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const totalTabs = 3;

  const handleNext = () => {
    setActiveTabIndex((prev) =>
      Math.min(prev + 1, totalTabs - 1)
    );
  };

  const handlePrevious = () => {
    setActiveTabIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Page heading */}
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Career Opportunities
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Job Application
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Tell us about yourself, share your experience, and
            review your application before submitting.
          </p>
        </header>

        {/* Application form */}
        <Tabs
          activeTabIndex={activeTabIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onTabClick={handleTabClick}
        />

        <p className="mt-6 text-center text-xs text-slate-500 sm:text-sm">
          Your information will be used to process your application.
        </p>
      </div>
    </main>
  );
}

export default App;