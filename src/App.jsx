import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;