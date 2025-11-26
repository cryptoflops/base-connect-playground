# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in Base Connect Playground, please report it responsibly:

### How to Report

1. **Email**: Send details to the repository maintainer
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Best effort

### Disclosure Policy

- We will work with you to understand and resolve the issue
- We request that you do not publicly disclose the vulnerability until we have released a fix
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using Base Connect Playground:

### For Users

- **Never share private keys or seed phrases** with anyone
- **Use hardware wallets** for significant amounts
- **Verify contract addresses** before interacting
- **Start with small amounts** when testing
- **Keep your wallet software updated**

### For Developers

- **Environment Variables**: Never commit `.env.local` or expose API keys
- **Private Keys**: Never hardcode private keys in source code
- **Dependencies**: Keep dependencies updated
- **Testing**: Test on testnets before mainnet
- **Audits**: Consider smart contract audits for production use

## Known Security Considerations

### Smart Contract Interactions

- This is a playground/demo application
- Always verify contract addresses and functions before signing transactions
- Use testnets for learning and experimentation
- The application does not custody funds - all transactions are user-initiated

### WalletConnect

- Uses official Reown AppKit SDK
- Connections are end-to-end encrypted
- No private keys are ever transmitted or stored
- Users maintain full control of their wallets

### Data Privacy

- No personal data is collected or stored
- Wallet addresses are only used for blockchain interactions
- No analytics or tracking beyond standard web hosting

## Security Updates

Security updates will be released as patch versions and documented in:
- [CHANGELOG.md](CHANGELOG.md)
- GitHub Security Advisories
- Release notes

## Contact

For security concerns, please reach out through:
- GitHub Issues (for non-sensitive questions)
- Direct contact with maintainers (for vulnerabilities)

---

**Remember**: If you're unsure whether something is a security issue, err on the side of caution and report it privately.
