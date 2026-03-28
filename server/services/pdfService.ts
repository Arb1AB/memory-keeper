import PDFDocument from 'pdfkit';
import { Response } from 'express';

interface FamilyData {
  name: string;
  members: any[];
  medicalInfo: any;
  insurance: any;
  passwords: any[];
  wishes: any[];
}

export const generateEmergencyPacket = (data: FamilyData, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="emergency-packet.pdf"');
  
  doc.pipe(res);
  
  // Title
  doc.fontSize(24)
    .font('Helvetica-Bold')
    .text('JUST IN CASE EMERGENCY PACKET', { align: 'center' });
  
  doc.moveDown();
  doc.fontSize(12)
    .font('Helvetica')
    .text(`Family: ${data.name}`, { align: 'center' });
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
  
  doc.moveDown(2);
  doc.addPage();
  
  // Medical Information
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('MEDICAL INFORMATION', { underline: true });
  doc.moveDown();
  
  if (data.medicalInfo) {
    doc.fontSize(12).font('Helvetica');
    doc.text(`Conditions: ${data.medicalInfo.conditions || 'Not specified'}`);
    doc.text(`Allergies: ${data.medicalInfo.allergies || 'Not specified'}`);
    doc.text(`Medications: ${data.medicalInfo.medications || 'Not specified'}`);
    doc.text(`Blood Type: ${data.medicalInfo.bloodType || 'Not specified'}`);
    doc.text(`Primary Doctor: ${data.medicalInfo.primaryDoctor || 'Not specified'}`);
    doc.text(`Doctor Phone: ${data.medicalInfo.doctorPhone || 'Not specified'}`);
    if (data.medicalInfo.emergencyNotes) {
      doc.text(`Emergency Notes: ${data.medicalInfo.emergencyNotes}`);
    }
  } else {
    doc.text('No medical information on file');
  }
  
  doc.addPage();
  
  // Insurance Information
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('INSURANCE INFORMATION', { underline: true });
  doc.moveDown();
  
  if (data.insurance) {
    doc.fontSize(12).font('Helvetica');
    doc.text(`Provider: ${data.insurance.provider || 'Not specified'}`);
    doc.text(`Policy Number: ${data.insurance.policyNumber || 'Not specified'}`);
    doc.text(`Group Number: ${data.insurance.groupNumber || 'Not specified'}`);
    doc.text(`Member ID: ${data.insurance.memberId || 'Not specified'}`);
    doc.text(`Phone: ${data.insurance.phone || 'Not specified'}`);
    if (data.insurance.notes) {
      doc.text(`Notes: ${data.insurance.notes}`);
    }
  } else {
    doc.text('No insurance information on file');
  }
  
  doc.addPage();
  
  // Family Contacts
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('FAMILY CONTACTS', { underline: true });
  doc.moveDown();
  
  if (data.members && data.members.length > 0) {
    data.members.forEach((member, index) => {
      doc.fontSize(12).font('Helvetica');
      doc.text(`${index + 1}. ${member.firstName} ${member.lastName}`);
      doc.text(`   Email: ${member.email}`);
      if (member.phone) doc.text(`   Phone: ${member.phone}`);
      doc.text(`   Role: ${member.role}`);
      doc.moveDown(0.5);
    });
  } else {
    doc.text('No family contacts on file');
  }
  
  doc.addPage();
  
  // Important Passwords
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('IMPORTANT PASSWORDS', { underline: true });
  doc.moveDown();
  
  if (data.passwords && data.passwords.length > 0) {
    data.passwords.forEach((pwd, index) => {
      doc.fontSize(12).font('Helvetica');
      doc.text(`${index + 1}. ${pwd.serviceName}`);
      if (pwd.username) doc.text(`   Username: ${pwd.username}`);
      doc.text(`   Password: ${pwd.passwordEncrypted}`);
      if (pwd.notes) doc.text(`   Notes: ${pwd.notes}`);
      doc.moveDown(0.5);
    });
  } else {
    doc.text('No passwords stored');
  }
  
  doc.addPage();
  
  // Wishes
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('WISHES & PREFERENCES', { underline: true });
  doc.moveDown();
  
  if (data.wishes && data.wishes.length > 0) {
    data.wishes.forEach((wish, index) => {
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text(`${index + 1}. ${wish.title} (${wish.category})`);
      doc.fontSize(12).font('Helvetica');
      if (wish.description) doc.text(`   ${wish.description}`);
      doc.text(`   Status: ${wish.isCompleted ? 'Completed' : 'Pending'}`);
      doc.moveDown(0.5);
    });
  } else {
    doc.text('No wishes recorded');
  }
  
  doc.addPage();
  
  // Emergency Instructions
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text('EMERGENCY INSTRUCTIONS', { underline: true });
  doc.moveDown();
  
  doc.fontSize(12).font('Helvetica');
  doc.text('In case of emergency:');
  doc.text('1. Call 911 immediately');
  doc.text('2. Present this packet to first responders');
  doc.text('3. Contact primary family members listed above');
  doc.text('4. Share medical information and allergies with medical staff');
  
  doc.moveDown();
  doc.fontSize(10).font('Helvetica-Oblique');
  doc.text('This packet contains sensitive information. Keep secure and only share with authorized individuals.', { align: 'center' });
  
  doc.end();
};