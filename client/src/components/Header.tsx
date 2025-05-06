import React from 'react';
import { Link } from 'wouter';

export default function Header() {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <i className="fas fa-water text-white text-2xl"></i>
          <h1 className="text-xl font-bold text-white">SeaSavr</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-white hover:text-neutral-100 font-medium text-sm">Dashboard</Link></li>
            <li><Link href="/reports" className="text-white hover:text-neutral-100 font-medium text-sm">Reports</Link></li>
            <li><Link href="/about" className="text-white hover:text-neutral-100 font-medium text-sm">About</Link></li>
            <li><Link href="/contact" className="text-white hover:text-neutral-100 font-medium text-sm">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
