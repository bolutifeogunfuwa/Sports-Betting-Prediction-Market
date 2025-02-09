# Decentralized Sports Betting Prediction Market

A blockchain-based platform that enables transparent, secure, and automated sports betting through decentralized prediction markets.

## Overview

This platform revolutionizes sports betting by creating trustless prediction markets where users can create, trade, and settle bets on sporting events using smart contracts and decentralized oracle networks for reliable outcome verification.

## Core Smart Contracts

### Event Creation Contract

Manages the lifecycle of betting events:
- Event registration and validation
- Market parameters configuration
- Event scheduling and deadlines
- Market state management
- Event cancellation protocols
- League and sport categorization
- Event metadata storage

### Odds Calculation Contract

Implements dynamic odds calculation and management:
- Automated odds adjustment
- Liquidity pool management
- Risk exposure balancing
- Market efficiency calculations
- Price feed integration
- Historical odds tracking
- Arbitrage detection

### Betting Contract

Handles all betting operations and settlement:
- Bet placement and validation
- Position management
- Automated settlement
- Fee calculation
- Liquidity provision
- Stake management
- Early cash-out processing

### Result Verification Contract

Ensures reliable outcome verification:
- Multi-oracle consensus
- Data source aggregation
- Dispute resolution
- Result finalization
- Oracle reward distribution
- Malicious actor detection
- Fallback mechanisms

## Technical Architecture

### System Components

1. **Core Layer**
    - Smart contract interactions
    - State management
    - Event handling
    - Access control

2. **Oracle Layer**
    - Data feeds integration
    - Consensus mechanisms
    - Verification protocols
    - Fallback systems

3. **Trading Layer**
    - Order matching
    - Position management
    - Settlement processing
    - Risk calculations

## Getting Started

### Prerequisites

- Node.js v16.0 or higher
- Hardhat development environment
- MetaMask or similar Web3 wallet
- Oracle node connections
- API access to sports data feeds

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/sports-prediction-market.git
cd sports-prediction-market
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Add required API keys and oracle endpoints
```

4. Deploy contracts:
```bash
npx hardhat deploy --network [network-name]
```

### Testing

Run test suite:
```bash
npx hardhat test
```

Generate coverage report:
```bash
npx hardhat coverage
```

## Platform Features

### For Bettors

1. Betting Operations
    - View available markets
    - Place bets
    - Monitor positions
    - Cash out early
    - View betting history
    - Track performance

2. Risk Management
    - Position limits
    - Loss limits
    - Exposure tracking
    - Portfolio analysis

### For Market Makers

1. Liquidity Provision
    - Deposit funds
    - Set spread parameters
    - Manage risk exposure
    - Monitor returns

2. Market Management
    - Create new markets
    - Adjust parameters
    - Monitor positions
    - Balance exposure

### For Oracle Operators

1. Data Provision
    - Submit results
    - Validate outcomes
    - Participate in consensus
    - Earn rewards

2. Quality Control
    - Monitor accuracy
    - Track performance
    - Handle disputes
    - Maintain uptime

## Risk Management

### Security Measures
- Multi-signature requirements
- Rate limiting
- Price manipulation prevention
- Automated circuit breakers
- Maximum bet limits

### Operational Controls
- Event verification
- Result confirmation delays
- Emergency shutdown procedures
- Dispute resolution process
- Automated compliance checks

## Smart Contract Security

- Comprehensive test coverage
- Professional audit reports
- Automated monitoring
- Bug bounty program
- Regular security updates

## API Documentation

Detailed API documentation available at `/docs/api-reference.md`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Compliance

- KYC/AML requirements
- Betting limits
- Regulatory reporting
- Age verification
- Responsible gambling tools

## License

Licensed under MIT License - see [LICENSE](LICENSE) for details

## Support

- Technical Support: support@predictionmarket.com
- Documentation: docs.predictionmarket.com
- Community Forum: community.predictionmarket.com

## Acknowledgments

- Chainlink for oracle services
- OpenZeppelin for smart contract libraries
- Sports data providers
