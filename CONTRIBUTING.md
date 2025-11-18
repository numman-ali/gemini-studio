# Contributing to Gemini Studio

Thank you for your interest in contributing to Gemini Studio! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the [issue tracker](https://github.com/numman-ali/gemini-studio/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - Detailed description of the problem or suggestion
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser and OS information

### Suggesting New Demos

Have an idea for a new interactive demo? Great! Open an issue with:

- Demo name and concept
- Description of the interaction/visualization
- Technologies you'd like to use
- Mockups or inspiration links (optional)

### Pull Requests

We welcome pull requests! Here's how to contribute code:

1. **Fork the repository**
   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/YOUR_USERNAME/gemini-studio.git
   cd gemini-studio
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow the existing code style
   - Keep commits focused and atomic
   - Write clear commit messages
   - Test your changes locally

5. **Test your code**
   ```bash
   npm run dev    # Test in development
   npm run build  # Ensure production build works
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve issue with X"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template with:
     - Description of changes
     - Related issue numbers
     - Screenshots/demos (if UI changes)

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Formatting**: Code is formatted with Prettier (if configured)
- **Naming**:
  - Components: PascalCase (`MyComponent.tsx`)
  - Files: kebab-case for utilities (`my-util.ts`)
  - Variables: camelCase

### Project Structure

```
app/demos/[demo-name]/
  └── page.tsx           # Demo component

components/
  └── [component-name]/  # Reusable components
      └── Component.tsx

lib/
  └── utils.ts           # Shared utilities
```

### Adding a New Demo

1. Create a new directory in `app/demos/your-demo-name/`
2. Add `page.tsx` with your demo component
3. Update `lib/demos.ts` to include your demo:
   ```typescript
   {
     id: "your-demo-name",
     name: "Demo Name",
     desc: "Short description",
     color: "#hexcolor"
   }
   ```
4. Ensure the demo is responsive and works across browsers
5. Add proper error handling and loading states

### Dependencies

- Try to use existing dependencies when possible
- For new dependencies, ensure they:
  - Are actively maintained
  - Have reasonable bundle size
  - Are well-documented
  - Have MIT or compatible licenses

## Commit Message Convention

We use conventional commits for clear history:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add fractal zoom demo with WebGL
fix: resolve physics simulation memory leak
docs: update README with new demo descriptions
```

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Publishing others' private information
- Other conduct deemed inappropriate in a professional setting

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out to the maintainer [@numman-ali](https://github.com/numman-ali)

## License

By contributing to Gemini Studio, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Gemini Studio! 🚀
