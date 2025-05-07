import { submitToAppsScript } from '../../lib/google-apps-script';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received registration request');
    
    const {
      teamName,
      leaderName,
      leaderPhone,
      leaderEmail,
      leaderGithub,
      leaderGender,
      members,
    } = req.body;

    console.log('Validating registration data:', {
      teamName,
      leaderName,
      leaderEmail,
      membersCount: members?.length
    });

    // Validate required fields
    if (!teamName || !leaderName || !leaderPhone || !leaderEmail || !leaderGithub || !leaderGender) {
      console.log('Validation failed: Missing leader fields');
      return res.status(400).json({ message: 'All leader fields are required' });
    }

    // Validate team size
    if (!members || members.length < 2 || members.length > 4) {
      console.log('Validation failed: Invalid team size');
      return res.status(400).json({ message: 'Team size must be between 3 and 5 members (including leader)' });
    }

    // Validate at least one female member
    const hasFemaleMember = members.some(m => m.gender === 'female') || leaderGender === 'female';
    if (!hasFemaleMember) {
      console.log('Validation failed: No female member');
      return res.status(400).json({ message: 'At least one female member is required in the team' });
    }

    // Validate member fields
    for (const member of members) {
      if (!member.name || !member.phone || !member.email || !member.github || !member.gender) {
        console.log('Validation failed: Missing member fields');
        return res.status(400).json({ message: 'All member fields are required' });
      }
    }

    // Prepare data for submission
    const submissionData = {
      timestamp: new Date().toISOString(),
      teamName,
      leader: {
        name: leaderName,
        phone: leaderPhone,
        email: leaderEmail,
        github: leaderGithub,
        gender: leaderGender
      },
      members: members.map(m => ({
        name: m.name,
        phone: m.phone,
        email: m.email,
        github: m.github,
        gender: m.gender
      }))
    };

    console.log('Submitting data to Apps Script');
    
    // Submit data using Apps Script
    await submitToAppsScript(submissionData);

    console.log('Registration successful');
    
    return res.status(200).json({ 
      message: 'Registration successful',
      success: true
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide specific error messages based on error type
    if (error.message.includes('not configured')) {
      return res.status(500).json({ 
        message: 'Server configuration error. Please contact support.',
        error: 'Configuration error'
      });
    }

    return res.status(500).json({ 
      message: 'Failed to register team',
      error: error.message
    });
  }
} 