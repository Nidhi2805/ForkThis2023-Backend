import { z } from 'zod';

// Data Transfer Object for Registration with custom error messages
const registerDto = z.object({
  email: z.string().email('Invalid email format'), // Custom email validation message
  password: z.string().min(6, 'Password must be at least 6 characters long'), // Custom password validation message
  name: z.string().min(1, 'Name is required') // Custom name validation message
});

// Data Transfer Object for Login
const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8) // Ensure password is at least 8 characters
});

// Extracting the types from the DTOs for use in the code
type registerDtoType = z.infer<typeof registerDto>;
type loginDtoType = z.infer<typeof loginDto>;

export { registerDto, loginDto, type registerDtoType, type loginDtoType };
