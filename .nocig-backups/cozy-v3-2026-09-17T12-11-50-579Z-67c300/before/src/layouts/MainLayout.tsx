import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import AudioPlayer from '../components/AudioPlayer';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet /> {/* 页面内容 */}
      <AudioPlayer /> {/* 音频播放器 */}
    </main>
    
    <Footer /> {/* 底部居中 */}
    
  </div>
);

export default MainLayout;