
import {ContactRest, useContactGetApi} from '../../hooks/contact-rest'
import {renderHook, waitFor} from '@testing-library/react'
 // Adjust the import path accordingly

describe('useContactGetApi', () => {
  const endpoint = '/about/contact';
  const API_URL = 'http://localhost:4000';
  const completeEndpoint = API_URL + endpoint;

  const asyncMock =  jest.fn()

  beforeEach(() => {
    // Mock global.fetch using the asyncMock
    global.fetch = asyncMock;
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocks after each test
  });

  it('should fetch contact data successfully', async () => {

    const mockContact: ContactRest[] = [{
      name: 'John Doe',
      email: 'johndoe@example.com',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    }]

    asyncMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'success',
          message: mockContact,
        }),
      })

    // Render the hook
    const { result } = renderHook(() =>
      useContactGetApi(endpoint)
    );

    // Wait for the hook to fetch the data
    await waitFor(() => expect(result.current).toMatchObject({ status: 'success', message: mockContact, error: null }));

  });

  it('should handle fetch failure', async () => {

    asyncMock.mockResolvedValueOnce({
        ok: false,
      });

    const { result } = renderHook(() =>
      useContactGetApi(endpoint)
    );

    // Wait for the hook to fetch the data
    await waitFor(() => expect(result.current).toMatchObject({ status: 'error', message: null, error: `Error using endpoint ${completeEndpoint}` }));
  });
});