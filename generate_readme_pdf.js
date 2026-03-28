const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
doc.pipe(fs.createWriteStream('Memory_Keeper_Documentation.pdf'));

// Title
doc.fontSize(28).font('Helvetica-Bold').text('Memory Keeper', { align: 'center' });
doc.fontSize(14).font('Helvetica').text('Complete Network Management System', { align: 'center' });
doc.moveDown();
doc.fontSize(10).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
doc.moveDown(2);

// Overview
doc.fontSize(18).font('Helvetica-Bold').text('Overview');
doc.fontSize(11).font('Helvetica').text('Memory Keeper is a full-stack web application that allows groups to manage members, store medical information, insurance details, credentials, wishes, and set up recurring check-ins. Perfect for families caring for elderly parents, companies managing employee information, or any group needing centralized information management.');
doc.moveDown();

// Features
doc.fontSize(18).font('Helvetica-Bold').text('Features');
doc.fontSize(12).font('Helvetica-Bold').text('Authentication:');
doc.fontSize(11).font('Helvetica').text('• Email/password registration and login\n• Google OAuth integration\n• JWT token-based authentication\n• Secure password hashing with bcrypt');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Network Management:');
doc.fontSize(11).font('Helvetica').text('• Create and manage networks (groups)\n• Unique invite codes for joining networks\n• Member roles: Owner, Admin, Viewer\n• View all network members');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Information Storage:');
doc.fontSize(11).font('Helvetica').text('• Medical Information: Conditions, allergies, medications, blood type, doctor contacts\n• Insurance Details: Provider, policy numbers, group numbers, contact info\n• Credentials: Service names, usernames, encrypted passwords\n• Wishes: Funeral, medical, estate, personal preferences with completion tracking');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Check-In System:');
doc.fontSize(11).font('Helvetica').text('• Create recurring check-ins (daily, weekly, monthly, once)\n• Set scheduled times\n• Track responses (Yes/No)\n• Automatic next check-in calculation\n• Pending check-ins filtering');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Emergency Packet:');
doc.fontSize(11).font('Helvetica').text('• One-click PDF generation with all network information\n• Ready for first responders or hospital visits\n• Includes: medical info, insurance, contacts, credentials, wishes');
doc.moveDown(2);

// Tech Stack
doc.fontSize(18).font('Helvetica-Bold').text('Tech Stack');
doc.fontSize(12).font('Helvetica-Bold').text('Backend:');
doc.fontSize(11).font('Helvetica').text('• Runtime: Node.js\n• Framework: Express.js\n• Language: TypeScript\n• Database: PostgreSQL\n• ORM: Sequelize\n• Authentication: JWT, Passport.js (Google OAuth)\n• PDF Generation: PDFKit');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Frontend:');
doc.fontSize(11).font('Helvetica').text('• Framework: React\n• Language: TypeScript\n• Build Tool: Vite\n• HTTP Client: Axios\n• Routing: React Router DOM');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('DevOps:');
doc.fontSize(11).font('Helvetica').text('• Version Control: Git\n• Database: PostgreSQL');
doc.moveDown(2);

// API Endpoints
doc.fontSize(18).font('Helvetica-Bold').text('API Endpoints');
doc.fontSize(12).font('Helvetica-Bold').text('Authentication:');
doc.fontSize(9).font('Courier').text('POST   /api/auth/register     - Register new user\nPOST   /api/auth/login        - Login with email/password\nGET    /api/auth/me           - Get current user\nGET    /api/auth/google       - Google OAuth login\nGET    /api/auth/google/callback - Google OAuth callback');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Network Management:');
doc.fontSize(9).font('Courier').text('POST   /api/network/create     - Create a new network\nGET    /api/network/my-network - Get current user\'s network\nPOST   /api/network/join      - Join network with invite code');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Information Management:');
doc.fontSize(9).font('Courier').text('GET/PUT   /api/info/medical     - Get/update medical info\nGET/PUT   /api/info/insurance   - Get/update insurance info\nCRUD     /api/info/passwords    - Manage credentials\nCRUD     /api/info/wishes       - Manage wishes');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Check-Ins:');
doc.fontSize(9).font('Courier').text('GET/POST   /api/checkins           - List/create check-ins\nPUT/DELETE /api/checkins/:id      - Update/delete check-in\nPOST       /api/checkins/:id/respond - Respond to check-in\nGET        /api/checkins/pending   - Get pending check-ins');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Emergency Packet:');
doc.fontSize(9).font('Courier').text('GET /api/packet/emergency-packet - Download PDF packet');
doc.moveDown(2);

// Database Schema
doc.fontSize(18).font('Helvetica-Bold').text('Database Schema');
doc.fontSize(11).font('Helvetica').text('Tables:\n• users - User accounts with authentication\n• networks - Groups/teams/organizations\n• medical_infos - Health information\n• insurances - Insurance details\n• passwords - Encrypted credentials\n• wishes - User preferences\n• check_ins - Recurring tasks');
doc.moveDown(2);

// Installation
doc.fontSize(18).font('Helvetica-Bold').text('Installation');
doc.fontSize(12).font('Helvetica-Bold').text('Prerequisites:');
doc.fontSize(11).font('Helvetica').text('• Node.js (v18+)\n• PostgreSQL (v14+)\n• npm or yarn');
doc.moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Setup Steps:');
doc.fontSize(10).font('Courier').text('1. git clone https://github.com/Arb1AB/memory-keeper.git\n2. cd memory-keeper\n3. npm install\n4. cd client && npm install && cd ..\n5. cp .env.example .env (configure with your credentials)\n6. sudo -u postgres psql -c "CREATE DATABASE memory_keeper;"\n7. npm run dev:full\n8. Open http://localhost:3000');
doc.moveDown(2);

// Environment Variables
doc.fontSize(18).font('Helvetica-Bold').text('Environment Variables');
doc.fontSize(9).font('Courier').text(`PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=memory_keeper
DB_USER=memory_keeper_user
DB_PASSWORD=yourpassword
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret`);
doc.moveDown(2);

// Google OAuth Setup
doc.fontSize(18).font('Helvetica-Bold').text('Google OAuth Setup');
doc.fontSize(11).font('Helvetica').text('1. Go to Google Cloud Console\n2. Create a new project or select existing\n3. Enable People API or Google+ API\n4. Go to APIs & Services → Credentials\n5. Create OAuth 2.0 Client ID\n6. Set authorized redirect URI: http://localhost:5000/api/auth/google/callback\n7. Copy Client ID and Secret to .env');
doc.moveDown(2);

// Project Structure
doc.fontSize(18).font('Helvetica-Bold').text('Project Structure');
doc.fontSize(9).font('Courier').text(`memory-keeper/
├── server/
│   ├── config/           # Database and passport config
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth middleware
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── services/         # PDF generation service
│   └── index.ts          # Server entry point
├── client/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   └── index.html
├── .env                  # Environment variables
├── package.json
└── README.md`);
doc.moveDown(2);

// Usage
doc.fontSize(18).font('Helvetica-Bold').text('Usage');
doc.fontSize(11).font('Helvetica').text('1. Register a new account or login with Google\n2. Create a Network (your group name)\n3. Share invite code with members to join\n4. Add information:\n   - Medical conditions, allergies, medications\n   - Insurance details\n   - Important credentials\n   - Personal wishes\n5. Create check-ins for recurring tasks\n6. Download emergency packet for emergencies');
doc.moveDown(2);

// Development Commands
doc.fontSize(18).font('Helvetica-Bold').text('Development Commands');
doc.fontSize(10).font('Courier').text(`npm run dev:full     # Starts both backend and frontend
npm run dev          # Backend only on port 5000
cd client && npm run dev  # Frontend only on port 3000
npm run build        # Compiles TypeScript to dist/
cd client && npm run build  # Builds React app`);
doc.moveDown(2);

// Footer
doc.fontSize(10).font('Helvetica-Oblique').text('Built with ❤️ for families and communities', { align: 'center' });
doc.fontSize(9).text('GitHub: https://github.com/Arb1AB/memory-keeper', { align: 'center' });

doc.end();

console.log('PDF generated: Memory_Keeper_Documentation.pdf');
