import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/hero-section';
import '@testing-library/jest-dom';

// Mock de next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('HeroSection', () => {
  it('renders the hero section correctly', () => {
    render(<HeroSection />);
    
    expect(screen.getByText('Shop the Latest Trends')).toBeInTheDocument();
    expect(screen.getByText(/discover our curated collection/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop now/i })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: /browse categories/i })).toHaveAttribute('href', '/categories');
  });
});