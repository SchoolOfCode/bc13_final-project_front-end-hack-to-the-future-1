import { render, screen, fireEvent } from '@testing-library/react'
import usersettings from "../../pages/usersettings"
import '@testing-library/jest-dom'
import UserSettings from '../../pages/usersettings'
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';





// describe('usersettings', () => {
//   it('renders the page correctly', () => {
//     render(<UserSettings/>)

//     const heading = screen.getByRole('heading')

//     expect(heading).toBeInTheDocument()
//     expect(heading).toHaveTextContent('Edit Account Details')
//   })
// })

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/usersettings',
  }),
}));

describe('UserSettings', () => {
  it('renders the page correctly', () => {
    render(<UserSettings />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Edit Account Details');
  });
});

