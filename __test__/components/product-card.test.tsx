import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/product-card';

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock de next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image: '/test-image.jpg',
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('links to the product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const productLink = screen.getByRole('link', { name: 'Test Product' });
    expect(productLink).toHaveAttribute('href', '/products/1');
  });

  it('has an "Add to Cart" button', () => {
    render(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
  });
});