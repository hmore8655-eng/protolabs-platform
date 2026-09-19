export const initialData = {
  hero: {
    headline: "ProtoLabs Engineering & Custom Hardware Solutions",
    subheading: "BUILD • EXPERIMENT • INNOVATE — Full-Stack Hardware, Embedded Systems & Telecommunications Platform. Add projects, manage pricing, and respond to custom proposals via your admin portal.",
    primaryCta: "Browse Catalog",
    secondaryCta: "Request Custom Project",
  },
  projects: [
    {
      id: "proj-1",
      title: "Smart Agriculture LoRaWAN Gateway & Sensor Node",
      category: "IoT & Automation",
      description: "ProtoLabs long-range environmental monitoring platform equipped with multi-sensor payload, solar MPPT charging PCB, and cloud dashboard integration.",
      price: 349,
      duration: "1-2 Weeks",
      features: [
        "SX1276 LoRa 868/915MHz Transceiver",
        "STM32 Ultra-low-power MCU Firmware",
        "Solar Charger PCB Schematic & Gerber",
        "ThingsBoard / MQTT Cloud Dashboards",
        "Complete BOM, Enclosure CAD & Docs"
      ],
      icon: "Radio",
      featured: true,
      published: true,
      order: 1,
      createdAt: "2026-09-01"
    },
    {
      id: "proj-2",
      title: "5G Microstrip Patch Array & Beamforming Simulation",
      category: "Telecom & RF",
      description: "28GHz mmWave 4x4 microstrip patch antenna array designed with CST Studio / ANSYS HFSS featuring beam steering optimization.",
      price: 499,
      duration: "2-3 Weeks",
      features: [
        "28GHz mmWave 4x4 Antenna Array Design",
        "Full CST / HFSS Simulation Files (.cst/.aedt)",
        "S11 Reflection & Gain Pattern Analysis",
        "RO4003C Low-loss Substrate Layout",
        "Detailed Academic/Project Report & Gerber"
      ],
      icon: "Antenna",
      featured: true,
      published: true,
      order: 2,
      createdAt: "2026-09-05"
    },
    {
      id: "proj-3",
      title: "Real-Time STM32 Audio DSP & Active Noise Control",
      category: "FPGA & DSP",
      description: "Dual-microphone acoustic echo cancellation and real-time noise reduction board powered by STM32F4/F7 DSP CMSIS libraries.",
      price: 299,
      duration: "1-2 Weeks",
      features: [
        "STM32F407 High-Performance ARM Cortex-M4",
        "WM8731 I2S Audio Codec Interfacing",
        "LMS Adaptive Filter Algorithm C Code",
        "Real-time FFT Frequency Analyzer",
        "Schematic Diagram & Test Audio Samples"
      ],
      icon: "Cpu",
      featured: false,
      published: true,
      order: 3,
      createdAt: "2026-09-08"
    },
    {
      id: "proj-4",
      title: "FPGA Gigabit Ethernet & PCIe Data Acquisition Card",
      category: "FPGA & DSP",
      description: "High-speed data acquisition hardware layout and Xilinx Artix-7 Verilog HDL core for multi-channel sensor digitizing.",
      price: 599,
      duration: "3-4 Weeks",
      features: [
        "Xilinx Artix-7 XC7A35T Verilog Cores",
        "RGMII Gigabit PHY Interface (UDP Stack)",
        "4-Channel 12-Bit 100MSPS ADC Driver",
        "Vivado Design Suite Workspace & Constraints",
        "Hardware Testbench Waveform Logs"
      ],
      icon: "Server",
      featured: true,
      published: true,
      order: 4,
      createdAt: "2026-09-10"
    },
    {
      id: "proj-5",
      title: "Compact 4-Layer KiCAD PCB for Automotive ECU",
      category: "PCB Design",
      description: "ISO-11898 compliant CAN-Bus and LIN telemetry ECU module for vehicle diagnostic data logging with reverse polarity protection.",
      price: 279,
      duration: "1 Week",
      features: [
        "High-Speed CAN FD Transceiver Layout",
        "Automotive TVS & ESD Surge Protection",
        "KiCAD 8 4-Layer Stackup Files",
        "3D STEP Model for Mechanical Enclosures",
        "JLCPCB Ready Gerber, CPL & BOM Files"
      ],
      icon: "Layers",
      featured: false,
      published: true,
      order: 5,
      createdAt: "2026-09-12"
    },
    {
      id: "proj-6",
      title: "Automated Industrial Sensor Node with NB-IoT / GSM",
      category: "Embedded Systems",
      description: "Cellular IoT telematics node with SIM7000G module, GPS location tracking, ultra-low sleep current (5uA), and battery management.",
      price: 389,
      duration: "2 Weeks",
      features: [
        "SIM7000G NB-IoT / eMTC / EGPRS Module",
        "ESP32-S3 / STM32WL Host Processor",
        "5uA Deep Sleep Power Optimization",
        "HTTP/MQTT API Payload Formatting",
        "Complete C++ Source & KiCAD Hardware"
      ],
      icon: "Zap",
      featured: false,
      published: true,
      order: 6,
      createdAt: "2026-09-15"
    }
  ],
  services: [
    {
      id: "srv-1",
      icon: "Clock",
      title: "24-Hour Proposal Turnaround",
      description: "Submit your custom engineering specs and receive a detailed block diagram, bill of materials, and guaranteed fixed price within 24 hours."
    },
    {
      id: "srv-2",
      icon: "Layers",
      title: "Manufacturable Gerber & Schematics",
      description: "Industry standard KiCAD or Altium Designer files, complete JLCPCB/PCBWay BOMs, CPL files, and 3D enclosure STEP models."
    },
    {
      id: "srv-3",
      icon: "ShieldCheck",
      title: "Verified Oscilloscope Test Bench",
      description: "Every hardware unit and DSP firmware is validated on digital storage oscilloscopes, logic analyzers, and RF spectrum analyzers."
    },
    {
      id: "srv-4",
      icon: "User",
      title: "Direct Admin Specialist Support",
      description: "One-on-one debugging sessions, video call code walkthroughs, and thesis/prototype presentation assistance."
    }
  ],
  howItWorks: [
    {
      step: "01",
      title: "Select or Request Custom",
      description: "Browse our admin-managed project catalog or submit custom project specifications using our inquiry form."
    },
    {
      step: "02",
      title: "Admin Review & Fixed Pricing",
      description: "Admin reviews your requirements, customizes project scope/pricing, and issues a formal proposal."
    },
    {
      step: "03",
      title: "Prototyping & Delivery",
      description: "ProtoLabs builds, simulates, and physically tests your hardware/firmware with complete source files & schematics."
    }
  ],
  portfolio: [
    {
      id: "port-1",
      title: "Drone Telemetry & Long-Range Video Overlay System",
      category: "Telecom & RF",
      client: "AeroTech Labs",
      outcome: "Achieved 12km Line-of-Sight transmission with zero frame loss.",
      techStack: ["STM32H7", "RFM95W", "OSD Chip", "Custom 4-Layer PCB"],
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "port-2",
      title: "Autonomous Warehouse RFID Inventory Scanner",
      category: "IoT & Automation",
      client: "LogiSmart Logistics",
      outcome: "Scans 500+ RFID tags per second with 99.8% accuracy.",
      techStack: ["UHF RFID Impinj", "ESP32", "MQTT", "Python Backend"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    }
  ],
  testimonials: [],
  // 100% CLEAN PRODUCTION INQUIRIES ARRAY (NO FAKE OR DUMMY LEADS)
  inquiries: [],
  settings: {
    siteTitle: "ProtoLabs",
    tagline: "BUILD • EXPERIMENT • INNOVATE — Electronics • Telecommunication • Real Solutions",
    contactEmail: "info@protolabs.eng",
    contactPhone: "+91 98765 43210",
    location: "ProtoLabs Innovation Hub, Tech Campus, Pune, MH - 411007",
    autoReplySubject: "Thank you for reaching out to ProtoLabs!",
    autoReplyTemplate: "Hello {{name}},\n\nThank you for submitting your inquiry for {{project}} on ProtoLabs. Our Admin engineering specialist has received your requirements and is preparing a custom proposal and pricing.\n\nYou can expect a direct response within 24 hours.\n\nBest regards,\nProtoLabs Team",
    thankYouMessage: "Thank you! Your inquiry has been received by ProtoLabs. Our Admin specialist will review your specifications and send custom pricing within 24 hours.",
    paymentDetails: "Google Pay / UPI ID: protolabs@okaxis | Bank Transfer: HDFC Bank (AC: 5010023491823, IFSC: HDFC0000123)",
    timelines: ["Urgent (< 1 Week)", "1-2 Weeks", "2-4 Weeks", "1-2 Months", "Flexible"],
    budgets: ["Under $300", "$300 - $500", "$500 - $1,000", "$1,000 - $2,500", "$2,500+"]
  }
};
