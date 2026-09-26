/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureMenu } from './components/SignatureMenu';
import { StoreLocator } from './components/StoreLocator';
import { AmbianceGallery } from './components/AmbianceGallery';
import { LoyaltyTracker } from './components/LoyaltyTracker';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E2922]">
        {/* Navigation Bar (Strict 3-Zone Top Bar Contract) */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <SignatureMenu />
          <StoreLocator />
          <AmbianceGallery />
          <LoyaltyTracker />
          <ContactSection />
        </main>

        {/* Global Drawers & Modals */}
        <CustomizationModal />
        <CartDrawer />
        <CheckoutModal />

        {/* Brand Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

