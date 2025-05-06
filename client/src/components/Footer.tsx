import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-water mr-2"></i>
              SeaSavr
            </h3>
            <p className="text-neutral-300 text-sm">Empowering communities to protect our oceans through citizen science and pollution reporting.</p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><Link href="/documentation" className="hover:text-white">Documentation</Link></li>
              <li><Link href="/research" className="hover:text-white">Research</Link></li>
              <li><Link href="/data" className="hover:text-white">Data Access</Link></li>
              <li><Link href="/api" className="hover:text-white">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Get Involved</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><Link href="/volunteer" className="hover:text-white">Volunteer</Link></li>
              <li><Link href="/cleanups" className="hover:text-white">Organize Cleanups</Link></li>
              <li><Link href="/partner" className="hover:text-white">Partner with Us</Link></li>
              <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="bg-neutral-700 hover:bg-neutral-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-neutral-700 hover:bg-neutral-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-neutral-700 hover:bg-neutral-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-neutral-700 hover:bg-neutral-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} SeaSavr. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
