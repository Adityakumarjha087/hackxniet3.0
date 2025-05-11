import Gallery from '../components/Gallery';

const sampleImages = [
  {
    src: '/images/gallery/image1.jpg',
    alt: 'Gallery Image 1',
    width: 800,
    height: 800,
  },
  {
    src: '/images/gallery/image2.jpg',
    alt: 'Gallery Image 2',
    width: 800,
    height: 800,
  },
  {
    src: '/images/gallery/image3.jpg',
    alt: 'Gallery Image 3',
    width: 800,
    height: 800,
  },
  {
    src: '/images/gallery/image4.jpg',
    alt: 'Gallery Image 4',
    width: 800,
    height: 800,
  },
  {
    src: '/images/gallery/image5.jpg',
    alt: 'Gallery Image 5',
    width: 800,
    height: 800,
  },
  {
    src: '/images/gallery/image6.jpg',
    alt: 'Gallery Image 6',
    width: 800,
    height: 800,
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Our Gallery
        </h1>
        <Gallery images={sampleImages} />
      </div>
    </div>
  );
} 