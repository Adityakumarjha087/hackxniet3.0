import styles from '../styles/team.module.css';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const coordinators = [
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
  {
    name: "Shubham Upadhyay",
    role: "Coordinator",
    image: "/images/team/team2.jpeg",
    linkedin: "#",
    twitter: "#",
    instagram: "#"
  },
  {
    name: "Kuldeepak Chaturvedi",
    role: "Coordinator",
    image: "/images/team/team1.jpeg",
    linkedin: "#",
    twitter: "#",
    instagram: "#"
  },
  {
    name: "Shreya Gupta",
    role: "Coordinator",
    image: "/images/team/team4.jpeg",
    linkedin: "#",
    twitter: "#",
    instagram: "#"
  },
  {
    name: "Vaishnavi",
    role: "Coordinator",
    image: "/images/team/team3.jpeg",
    linkedin: "#",
    twitter: "#",
    instagram: "#"
  }
];

const MemberCard = ({ member }) => (
  <div className={styles.card} style={{
    padding: '2rem 1.5rem',
    transform: 'scale(1.05)',
    margin: '1rem'
  }}>
    <div className={styles.avatarAccent} style={{
      width: '140px',
      height: '140px',
      opacity: '0.6'
    }}></div>
    <div className={styles.imageContainer} style={{
      width: '140px',
      height: '140px',
      marginBottom: '1.5rem'
    }}>
      <Image
        src={member.image}
        alt={member.name}
        width={250}
        height={250}
        className={styles.image}
      />
    </div>
    <h3 className={styles.name} style={{
      fontSize: '1.4rem',
      marginBottom: '0.75rem'
    }}>{member.name}</h3>
    <p className={styles.role} style={{
      fontSize: '1.1rem',
      fontWeight: '500',
      letterSpacing: '0.5px'
    }}>{member.role}</p>
    <div className={styles.socialLinks} style={{
      marginTop: '1.25rem',
      gap: '1rem'
    }}>
      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className={styles.icon} style={{ fontSize: '1.5rem' }} />
      </a>
      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className={styles.icon} style={{ fontSize: '1.5rem' }} />
      </a>
      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
        <FaInstagram className={styles.icon} style={{ fontSize: '1.5rem' }} />
      </a>
    </div>
  </div>
);

export default function Team() {
  return (
    <div className={styles.container} style={{
      backgroundImage: "url('/images/bg57.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      padding: '3rem 1rem'
    }}>
      <h2 className={styles.heading} style={{
        fontSize: '4.5rem',
        marginBottom: '3rem',
        textShadow: '0 4px 30px rgba(255,215,0,0.3)'
      }}>Our Coordinators</h2>
      <div className={styles.teamGrid} style={{
        maxWidth: '1400px',
        gap: '2rem',
        margin: '0 auto'
      }}>
        {coordinators.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
} 