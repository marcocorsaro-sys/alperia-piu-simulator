import React from 'react';
import { useBusinessCase } from './hooks/useBusinessCase.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useActiveSection } from './hooks/useActiveSection.js';

import Cover from './components/Cover.jsx';
import StickyNav from './components/StickyNav.jsx';
import Hero from './components/Hero.jsx';
import ProgramIntro from './components/ProgramIntro.jsx';
import Brand from './components/Brand.jsx';
import ExperienceIntro from './components/ExperienceIntro.jsx';
import ScreenSections from './components/ScreenSections.jsx';
import TierSystem from './components/TierSystem.jsx';
import BusinessCaseSim from './components/BusinessCaseSim.jsx';
import BusinessCaseTable from './components/BusinessCaseTable.jsx';
import CostValue from './components/CostValue.jsx';
import RecapCosti from './components/RecapCosti.jsx';
import ConsentValue from './components/ConsentValue.jsx';
import ReferenceCases from './components/ReferenceCases.jsx';
import Timeline from './components/Timeline.jsx';
import ArchitetturaTecnica from './components/ArchitetturaTecnica.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useScrollReveal();
  const activeSection = useActiveSection('cover');
  const businessCase = useBusinessCase();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body">
      {/* Cover — first impression, positions the tool as asset */}
      <Cover result={businessCase.result} />

      {/* Sticky nav appears after cover */}
      <StickyNav activeSection={activeSection} />

      {/* Proposal narrative sections */}
      <Hero />
      <ProgramIntro />
      <Brand />
      <ExperienceIntro />
      <ScreenSections />
      <TierSystem />

      {/* Interactive simulator — the live business case */}
      <BusinessCaseSim {...businessCase} />

      {/* Reference materials */}
      <BusinessCaseTable />
      <CostValue />
      <RecapCosti />
      <ConsentValue />
      <ReferenceCases />
      <Timeline />
      <ArchitetturaTecnica />
      <Footer />
    </div>
  );
}
