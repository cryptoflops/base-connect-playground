# Contributing to Base Connect Playground

Thank you for your interest in contributing to Base Connect Playground! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/base-connect-playground.git
   cd base-connect-playground
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/cryptoflops/base-connect-playground.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment**
   ```bash
   cp .env.local.example .env.local
   # Add your NEXT_PUBLIC_PROJECT_ID
   ```

## 💻 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Branch naming conventions:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation updates
   - `refactor/` - Code refactoring
   - `test/` - Adding tests

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Run development server
   npm run dev
   
   # Test build
   npm run build
   
   # Test on multiple chains
   # - Connect wallet
   # - Switch networks (Base, Optimism, Arbitrum, Celo)
   # - Test contract interactions
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Commit message format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Naming**: Use descriptive, camelCase for variables/functions, PascalCase for components
- **Formatting**: Code will be auto-formatted (if Prettier is set up)

### File Organization

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── config/          # Configuration files
├── context/         # React context providers
└── types/           # TypeScript type definitions
```

### Adding New Features

1. **New Component**
   - Create in `src/components/`
   - Export from component file
   - Import where needed

2. **New Chain**
   - Add chain definition in `src/config/index.ts`
   - Update network array
   - Test thoroughly

3. **New Contract Interaction**
   - Create component in `src/components/`
   - Use Wagmi hooks
   - Handle loading/error states
   - Add to main page

### Testing Checklist

Before submitting a PR, ensure:

- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Tested on localhost
- [ ] Wallet connection works
- [ ] Network switching works
- [ ] Contract interactions work on all supported chains
- [ ] UI looks good on desktop and mobile
- [ ] No console errors or warnings

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - Browser and version
   - Wallet used
   - Network/chain
   - Node.js version (if relevant)
6. **Screenshots**: If applicable

## 💡 Suggesting Features

When suggesting features:

1. **Use Case**: Describe the problem this feature solves
2. **Proposed Solution**: How you envision the feature working
3. **Alternatives**: Other solutions you've considered
4. **Additional Context**: Any other relevant information

## 🔒 Security

If you discover a security vulnerability:

- **DO NOT** open a public issue
- Email the maintainer directly (see SECURITY.md)
- Allow time for the issue to be addressed before public disclosure

## 📝 Documentation

When updating documentation:

- Keep it clear and concise
- Use proper markdown formatting
- Include code examples where helpful
- Update README.md if adding features

## ✅ Pull Request Guidelines

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Changes have been tested
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains what and why

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots here

## Additional Notes
Any additional information
```

## 🤝 Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the community
- Show empathy towards others

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Reown AppKit Docs](https://docs.reown.com/appkit/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎉 Recognition

Contributors will be:
- Listed in the project's contributors
- Mentioned in release notes (for significant contributions)
- Appreciated in the community!

## 📞 Questions?

If you have questions:
- Check existing issues and discussions
- Open a new discussion
- Reach out to maintainers

---

Thank you for contributing to Base Connect Playground! 🚀
