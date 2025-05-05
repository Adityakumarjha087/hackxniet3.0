// In a real application, you would use a database
// This is just for demonstration
export const users = [];

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function findUserById(id) {
  return users.find(user => user.id === id);
}

export function addUser(user) {
  users.push(user);
  return user;
} 