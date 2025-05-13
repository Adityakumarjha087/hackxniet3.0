import styles from '../styles/team.module.css';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Shakti Singh",
    role: "Coordinator",
    image: "/images/team/coordinator1.jpg",
    linkedin: "https://www.linkedin.com/in/shakti-singh-a2952524a",
    twitter: "0231cse080@niet.co.in",
    instagram: "https://instagram.com/johndoe"
  },
  {
    name: "Udeshya Ray",
    role: "Coordinator",
    image: "/images/team/coordinator2.jpg",
    linkedin: "https://www.linkedin.com/in/udeshyakumarray",
    twitter: "https://twitter.com/janesmith",
    instagram: "https://instagram.com/janesmith"
  },
  // Add more team members as needed
];

export default function Team() {
  return (
    <div className={styles.container} style={{
      backgroundImage: "url('/images/bg57.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}>
      <h2 className={styles.heading}>Our Coordinator</h2>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.avatarAccent}></div>
            <div className={styles.imageContainer}>
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className={styles.image}
              />
            </div>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <div className={styles.socialLinks}>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={styles.icon} />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className={styles.icon} />
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.icon} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 