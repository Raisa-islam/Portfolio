export default function Footer() {
  return (
    <footer className="py-14 pb-10 text-center border-t border-border-light">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-sm text-text-3 my-1">
          Designed & built by{' '}
          <span className="font-display font-bold gradient-text">Raisa Islam</span>
        </p>
        <p className="text-sm text-text-3 my-1">
          &copy; {new Date().getFullYear()} &middot; All rights reserved
        </p>
      </div>
    </footer>
  );
}
