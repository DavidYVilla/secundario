import Link from 'next/link';

const ReturnButton = () => {
  return (
    <div className="text-center my-6">
      <Link
        href="/pages/blog"
        className="px-6 py-3 rounded-lg bg-primary dark:bg-secondary text-white shadow-lg hover:bg-primary-dark transition-all"
      >
        ⬅️ Volver al Blog
      </Link>
    </div>
  );
};

export default ReturnButton;
