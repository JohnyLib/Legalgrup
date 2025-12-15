export type Locale = "en" | "ru" | "ro";

export interface TranslationKeys {
  // Common
  common: {
    bookConsultation: string;
    scheduleCall: string;
    contact: string;
    home: string;
    services: string;
    attorneys: string;
    insights: string;
    caseReview: string;
    viewAll: string;
    readMore: string;
    download: string;
    subscribe: string;
    send: string;
    responseTime: string;
    hours: string;
    days: string;
  };

  // Navigation
  nav: {
    home: string;
    services: string;
    attorneys: string;
    insights: string;
    contact: string;
    caseReview: string;
    scheduleCall: string;
  };

  // Home page
  home: {
    topBar: {
      phone: string;
      email: string;
      location: string;
      immediateCaseReview: string;
      bookConsultation: string;
    };
    hero: {
      badge: string;
      title: string;
      description: string;
      bookConsultation: string;
      downloadProfile: string;
      retainedClients: string;
      responseUnder24Hours: string;
      yearsExperience: string;
      mattersResolved: string;
      clientRating: string;
    };
    practiceAreas: {
      subtitle: string;
      title: string;
      description: string;
      viewAllServices: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    results: {
      subtitle: string;
      title: string;
      items: string[];
    };
    testimonials: {
      subtitle: string;
      title: string;
      items: string[];
    };
    team: {
      subtitle: string;
      title: string;
      description: string;
      viewAllAttorneys: string;
      members: Array<{
        name: string;
        role: string;
        focus: string;
      }>;
    };
    consultationCta: {
      eyebrow: string;
      title: string;
      description: string;
      bullets: string[];
      lineTitle: string;
      lineCta: string;
    };
  };

  // Services page
  services: {
    hero: {
      badge: string;
      title: string;
      description: string;
      bookServicesCall: string;
      downloadServicesDeck: string;
      partnerLedPods: string;
      responseUnder24Hours: string;
      mattersActive: string;
      averageResponse: string;
      jurisdictions: string;
    };
    grid: {
      subtitle: string;
      title: string;
      description: string;
      clearSLAs: string;
      scheduleConsultation: string;
      items: Array<{
        title: string;
        description: string;
        bullets: string[];
      }>;
    };
    programs: {
      subtitle: string;
      title: string;
      description: string;
      noHiddenFees: string;
      viewScopeTimeline: string;
      list: Array<{
        name: string;
        badge: string;
        price: string;
        notes: string[];
      }>;
    };
    coverage: {
      subtitle: string;
      title: string;
      tags: string[];
      availabilityLabel: string;
      slotCta: string;
      slots: string[];
    };
    photos: {
      subtitle: string;
      title: string;
      description: string;
      items: string[];
    };
    cta: {
      subtitle: string;
      title: string;
      description: string;
      bullets: string[];
      button: string;
    };
  };

  // Attorneys page
  attorneys: {
    hero: {
      badge: string;
      title: string;
      description: string;
      mattersYearly: string;
      courtAppearances: string;
      avgResponse: string;
      principles: string[];
    };
    team: {
      subtitle: string;
      title: string;
      description: string;
      directPartnerAccess: string;
      members: Array<{
        name: string;
        role: string;
        focus: string;
        matters: string;
      }>;
    };
    approach: {
      subtitle: string;
      title: string;
      items: string[];
      experienceTitle: string;
      experienceDescription: string;
      experienceBullets: string[];
    };
    photos: {
      subtitle: string;
      title: string;
      description: string;
      items: string[];
    };
    cta: {
      subtitle: string;
      title: string;
      description: string;
      button: string;
      notes: string[];
    };
  };

  // Insights page
  insights: {
    hero: {
      badge: string;
      title: string;
      description: string;
      tags: {
        corporateDeals: string;
        disputes: string;
        employment: string;
        regulatory: string;
      };
      newsItems: {
        dealRoomKit: {
          label: string;
          description: string;
        };
        crossBorderBrief: {
          title: string;
          description: string;
        };
      };
    };
    articles: {
      subtitle: string;
      title: string;
      description: string;
      viewAllInsights: string;
      readMemo: string;
    };
    library: {
      subtitle: string;
      title: string;
      downloadReady: string;
      highlights: string[];
    };
    photos: {
      subtitle: string;
      title: string;
      description: string;
      articleCover: string;
      teamSpeaking: string;
      eventWorkshop: string;
    };
    newsletter: {
      subtitle: string;
      title: string;
      description: string;
      tags: {
        deals: string;
        disputes: string;
        employment: string;
        regulatory: string;
      };
    };
  };

  // Contact page
  contact: {
    hero: {
      badge: string;
      title: string;
      description: string;
      responseUnder24h: string;
      confidentialHandling: string;
      partnerLedIntake: string;
      hotline: string;
      intake: string;
      location: string;
      hybridAvailability: string;
    };
    offices: {
      subtitle: string;
      title: string;
    };
    photos: {
      subtitle: string;
      title: string;
      description: string;
      jakartaOffice: string;
      singaporeOffice: string;
      teamGreeting: string;
    };
    formSection: {
      subtitle: string;
      title: string;
      description: string;
      benefits: {
        partnerLed: string;
        responseUnder24h: string;
        scopeClarity: string;
        budgetRanges: string;
      };
      formTitle: string;
      formSubtitle: string;
      matterSummary: string;
      matterSummaryPlaceholder: string;
      privacyAgreement: string;
      submit: string;
    };
  };

  // Forms
  forms: {
    consultation: {
      title: string;
      fullName: string;
      company: string;
      email: string;
      phone: string;
      matterSummary: string;
      privacyAgreement: string;
      submit: string;
      success: string;
      validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        phoneRequired: string;
        matterRequired: string;
        privacyRequired: string;
      };
      placeholders: {
        fullName: string;
        company: string;
        email: string;
        phone: string;
        matterSummary: string;
        matterType: string;
        matterTypeOptions: {
          corporate: string;
          mna: string;
          disputes: string;
          employment: string;
          regulatory: string;
          private: string;
          other: string;
        };
      };
      status: {
        submitting: string;
        submit: string;
        successTitle: string;
        successClose: string;
      };
    };
    contact: {
      title: string;
      fullName: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
      validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
        privacyRequired: string;
      };
      placeholders: {
        fullName: string;
        email: string;
        phone: string;
        message: string;
      };
      status: {
        sending: string;
        submit: string;
      };
    };
    newsletter: {
      title: string;
      name: string;
      email: string;
      subscribe: string;
      noSpam: string;
      success: string;
    };
    scheduleCall: {
      title: string;
      fullName: string;
      phone: string;
      problemDescription: string;
      problemDescriptionPlaceholder: string;
      submit: string;
      success: string;
      validation: {
        fullNameRequired: string;
        phoneRequired: string;
        problemDescriptionRequired: string;
      };
      status: {
        submitting: string;
        successTitle: string;
        successClose: string;
      };
    };
  };
}

