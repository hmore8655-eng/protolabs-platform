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
      price: 4999,
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
      price: 7999,
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
      price: 3999,
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
      price: 9999,
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
      price: 3499,
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
      price: 5499,
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
    },
    {
      id: "proj-7",
      title: "Line Following Car Using Arduino Uno R3",
      category: "Robotics",
      description: "Autonomous line tracking robotic vehicle powered by Arduino Uno R3, dual TCRT5000 IR sensor array, and L298N high-torque dual H-Bridge motor driver.",
      price: 1999,
      duration: "3-5 Days",
      features: [
        "Arduino Uno R3 ATmega328P Microcontroller",
        "Dual TCRT5000 Infrared Reflective Sensors",
        "L298N Dual H-Bridge Motor Driver Module",
        "2WD High-Torque Geared DC Chassis Motors",
        "PID Algorithm Source Code & Wiring Diagram"
      ],
      icon: "Cpu",
      featured: true,
      published: true,
      order: 7,
      createdAt: "2026-09-18"
    },
    {
      id: "proj-8",
      title: "Bluetooth Controlled Car Using ESP32",
      category: "Robotics",
      description: "Smartphone-steered RC robotic vehicle powered by ESP32 Wi-Fi & Bluetooth Dual-Core SoC with real-time Android gamepad app telemetry.",
      price: 2499,
      duration: "1 Week",
      features: [
        "ESP32-WROOM-32 32-Bit Dual Core SoC",
        "Bluetooth Serial Telemetry & Mobile App Control",
        "L298N Motor Driver with PWM Speed Control",
        "Rechargeable 18650 Li-ion Dual Battery Pack",
        "Complete Arduino C++ Firmware & APK Files"
      ],
      icon: "Radio",
      featured: true,
      published: true,
      order: 8,
      createdAt: "2026-09-18"
    },
    {
      id: "proj-9",
      title: "Smart Automatic Street Light Using Arduino",
      category: "IoT & Automation",
      description: "Energy-saving intelligent street illumination system with LDR day/night sensing, PIR human motion detection, and dynamic PWM LED dimming.",
      price: 1499,
      duration: "3-5 Days",
      features: [
        "Arduino Uno / Nano Controller Board",
        "High-Sensitivity Light Dependent Resistor (LDR)",
        "HC-SR501 Passive Infrared Motion Detector",
        "Dynamic PWM Multi-Level Power Dimming",
        "Energy Saving Simulation & Hardware Schematics"
      ],
      icon: "Zap",
      featured: false,
      published: true,
      order: 9,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-10",
      title: "Automatic Water Level Control System",
      category: "Embedded Systems",
      description: "Automated overhead tank and sump pump management system with ultrasonic distance sensor, dry-run protection, and relay switching.",
      price: 1799,
      duration: "4-6 Days",
      features: [
        "HC-SR04 Contactless Ultrasonic Depth Sensor",
        "Optocoupled 10A High-Voltage Relay Module",
        "Dry-Run Motor Burnout Prevention Algorithm",
        "16x2 I2C Liquid Crystal Display Status Panel",
        "Circuit Diagram, Breadboard Layout & Code"
      ],
      icon: "Layers",
      featured: false,
      published: true,
      order: 10,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-11",
      title: "RFID Smart Door Lock & Access Control",
      category: "Embedded Systems",
      description: "Contactless biometric security system utilizing RC522 13.56MHz RFID reader, solenoid door strike actuator, and master authorization card programming.",
      price: 2199,
      duration: "1 Week",
      features: [
        "MFRC522 13.56MHz High-Frequency RFID Reader",
        "12V Electromagnetic Solenoid Door Latch",
        "Buzzer & Bi-Color LED Authorization Feedback",
        "EEPROM Onboard Authorized Card Storage",
        "Complete Enclosure CAD & Circuit Gerber"
      ],
      icon: "Cpu",
      featured: true,
      published: true,
      order: 11,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-12",
      title: "Touchless Smart Dustbin with Servo Lid",
      category: "Robotics",
      description: "Hygienic hands-free automatic waste disposal system powered by ultrasonic proximity detection and micro servo lid actuating mechanism.",
      price: 1299,
      duration: "2-4 Days",
      features: [
        "Ultrasonic Distance Sensor for Gesture Trigger",
        "SG90 Metal-Gear Responsive Servo Actuator",
        "Battery-Efficient Standby Power Consumption",
        "Compact 3D Printable Mechanical Hinge Linkage",
        "Full Arduino Source Code & Assembly Guide"
      ],
      icon: "Zap",
      featured: false,
      published: true,
      order: 12,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-13",
      title: "Smart Home Automation System with Voice & App",
      category: "IoT & Automation",
      description: "Multi-channel AC appliance control platform integrating ESP8266 NodeMCU / ESP32, Sinric Pro / Blynk cloud, and Google Assistant voice commands.",
      price: 3499,
      duration: "1-2 Weeks",
      features: [
        "ESP8266 / ESP32 Wi-Fi IoT Microcontroller",
        "4-Channel Optocoupled 230V AC Relay Board",
        "Manual Wall Switch Real-Time Feedback Sync",
        "Google Assistant & Amazon Alexa Voice Control",
        "Blynk / Sinric Pro Cloud Dashboard Setup"
      ],
      icon: "Radio",
      featured: true,
      published: true,
      order: 13,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-14",
      title: "IoT RFID Attendance System with Cloud Logging",
      category: "IoT & Automation",
      description: "Automated student & employee attendance logger combining RC522 RFID reader, ESP8266 Wi-Fi, and Google Sheets / Firebase real-time database logging.",
      price: 2899,
      duration: "1 Week",
      features: [
        "RC522 13.56MHz RFID Card & Keyfob Scanner",
        "ESP8266 NodeMCU Wi-Fi Cloud Uploader",
        "Instant Google Sheets / Firebase Data Logging",
        "OLED Display for User Name & Timestamp",
        "Exportable Excel Attendance Report Engine"
      ],
      icon: "Server",
      featured: true,
      published: true,
      order: 14,
      createdAt: "2026-09-19"
    },
    {
      id: "proj-15",
      title: "Smart Agriculture Monitoring System Using Raspberry Pi",
      category: "IoT & Automation",
      description: "Precision farming environment analyzer leveraging Raspberry Pi 4, soil NPK & moisture sensors, DHT22 climate telemetry, and automated drip irrigation.",
      price: 5999,
      duration: "1-2 Weeks",
      features: [
        "Raspberry Pi 4 Model B Single Board Computer",
        "Soil Moisture & Ambient Temperature/Humidity Sensor",
        "Automated Submersible DC Water Pump Relay",
        "Python Flask Web Dashboard with Live Telemetry",
        "Telegram / Email Automated Crop Alerts"
      ],
      icon: "Cpu",
      featured: true,
      published: true,
      order: 15,
      createdAt: "2026-09-19"
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
    const FALLBACK_MONGO_URI = 'mongodb+srv://protolabs26_db_user:nzPpm8XB6R687Ot3@cluster0.7hkrpyd.mongodb.net/?appName=Cluster0';
    const mongoUri = process.env.MONGODB_URI || FALLBACK_MONGO_URI;

    try {
      console.log('[MongoDB Atlas] Connecting to cluster...');
      const client = new MongoClient(mongoUri, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
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
      this.cloudError = null;
      console.log('✅ [MongoDB Atlas] Cloud Persistence is ACTIVE. Edits will survive all Render spin-downs and restarts!');
      return true;
    } catch (err) {
      console.error('[MongoDB Atlas Warning] Failed to connect to MongoDB URI:', err.message);
      this.isCloudConnected = false;
      this.cloudError = err.message;
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
        
        // Upgrade any legacy USD prices to INR if needed
        if (Array.isArray(this.data.projects)) {
          this.data.projects.forEach(p => {
            if (p.price === 349) p.price = 4999;
            else if (p.price === 499) p.price = 7999;
            else if (p.price === 299) p.price = 3999;
            else if (p.price === 599) p.price = 9999;
            else if (p.price === 279) p.price = 3499;
            else if (p.price === 389) p.price = 5499;
          });
        }

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
