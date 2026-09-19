const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'data', 'database.json');

// Real Production Database configuration for Harsh More / ProtoLabs
const defaultData = {
  users: [
    {
      id: "usr-admin-harsh",
      name: "Harsh More (ProtoLabs Specialist)",
      email: "protolabs26@gmail.com",
      // Password: PROTOLABS@123
      passwordHash: "$2b$10$6RXExc1aga5SEQRgDmVm7uwTqhRUQTh1MGFErLHZNfv1R8a7B.9Pm",
      role: "admin",
      createdAt: "2026-09-01"
    }
  ],
  hero: {
    headline: "ProtoLabs Engineering & Custom Hardware Solutions",
    subheading: "BUILD • EXPERIMENT • INNOVATE — Full-Stack Hardware, Embedded Systems & Telecommunications Engineering Platform. Founded by Harsh More at Narhe, Pune.",
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
      description: "Submit your custom engineering specs and chat directly with Harsh More to finalize your timeline, budget, and project scope within 24 hours."
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
      description: "One-on-one live chat and video call code walkthroughs with Harsh More to discuss budget and custom deadlines."
    }
  ],
  howItWorks: [
    {
      step: "01",
      title: "Select or Request Custom",
      description: "Browse our project catalog or submit custom project specifications using our inquiry form."
    },
    {
      step: "02",
      title: "Live Chat with Harsh More",
      description: "Discuss your custom timeline and target budget range directly with Harsh More via live chat or proposal email."
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
  inquiries: [],
  chatThreads: [],
  chatMessages: [],
  settings: {
    siteTitle: "ProtoLabs",
    tagline: "BUILD • EXPERIMENT • INNOVATE — Electronics • Telecommunication • Real Solutions",
    contactEmail: "protolabs26@gmail.com",
    contactPhone: "+91 8856082411",
    location: "Narhe, Pune - 411041",
    autoReplySubject: "Thank you for reaching out to ProtoLabs Engineering!",
    autoReplyTemplate: "Hello {{name}},\n\nThank you for submitting your project inquiry for {{project}} on ProtoLabs. Harsh More (ENTC Engineering Specialist) has received your specifications. Please use our Live Chat widget or expect a direct proposal email within 24 hours to finalize timeline & budget.\n\nBest regards,\nHarsh More | ProtoLabs Engineering\nNarhe, Pune - 411041\nPhone: +91 8856082411",
    thankYouMessage: "Thank you! Your inquiry has been received. You can now use the Live Chat widget below to chat directly with Harsh More regarding your timeline and budget!",
    paymentDetails: "Google Pay / PhonePe / UPI ID: hmore8655@okicici | Bank Transfer on Request"
  }
};

const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    this.isCloudConnected = false;
    this.mongoClient = null;
    this.mongoCollection = null;
    this.ensureDirExists();
    this.load();
  }

  async initCloud() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('[Storage] No MONGODB_URI set. Running on local JSON storage (ephemeral on free Render containers).');
      return false;
    }

    try {
      console.log('[MongoDB Atlas] Connecting to cluster...');
      const client = new MongoClient(mongoUri, {
        serverSelectionTimeoutMS: 8000,
      });
      await client.connect();
      this.mongoClient = client;
      const db = client.db('protolabs_platform');
      this.mongoCollection = db.collection('app_state');

      // Fetch existing cloud state
      const doc = await this.mongoCollection.findOne({ key: 'main_state' });
      if (doc && doc.data) {
        console.log('[MongoDB Atlas] Cloud state retrieved successfully! Hydrating platform data...');
        this.data = doc.data;
        // Keep local cache up to date
        try {
          fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (e) {}
      } else {
        console.log('[MongoDB Atlas] Initializing state in MongoDB Atlas cloud collection...');
        await this.mongoCollection.updateOne(
          { key: 'main_state' },
          { $set: { key: 'main_state', data: this.data, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
      }

      this.isCloudConnected = true;
      console.log('✅ [MongoDB Atlas] Cloud Persistence is ACTIVE. Edits will survive all Render spin-downs and restarts!');
      return true;
    } catch (err) {
      console.error('[MongoDB Atlas Warning] Failed to connect to MongoDB URI:', err.message);
      this.isCloudConnected = false;
      return false;
    }
  }

  ensureDirExists() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  load() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.chatThreads) this.data.chatThreads = [];
        if (!this.data.chatMessages) this.data.chatMessages = [];
        // Update admin email & location if changed
        if (this.data.users && this.data.users[0]) {
          this.data.users[0].email = "protolabs26@gmail.com";
          this.data.users[0].passwordHash = "$2b$10$6RXExc1aga5SEQRgDmVm7uwTqhRUQTh1MGFErLHZNfv1R8a7B.9Pm";
        }
        if (this.data.settings) {
          this.data.settings.contactEmail = "protolabs26@gmail.com";
          this.data.settings.location = "Narhe, Pune - 411041";
        }
        this.save();
      } else {
        this.data = defaultData;
        this.save();
      }
    } catch (e) {
      console.error('Failed to load database file, creating default:', e);
      this.data = defaultData;
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error('Failed to write database file:', e);
    }

    if (this.isCloudConnected && this.mongoCollection) {
      this.mongoCollection.updateOne(
        { key: 'main_state' },
        { $set: { data: this.data, updatedAt: new Date().toISOString() } },
        { upsert: true }
      ).catch(err => {
        console.error('[MongoDB Atlas Save Error]:', err.message);
      });
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(defaultData));
    this.data.inquiries = [];
    this.data.chatThreads = [];
    this.data.chatMessages = [];
    this.data.users[0].passwordHash = bcrypt.hashSync("PROTOLABS@123", 10);
    this.save();
    return this.data;
  }

  importData(importedData) {
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('Invalid backup file structure');
    }
    this.data = {
      ...defaultData,
      ...importedData
    };
    this.save();
    return this.data;
  }
}

const dbInstance = new Database();
module.exports = dbInstance;
