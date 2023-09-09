function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="footer">E-Commerce @ {currentYear}</footer>;
}

export default Footer;
