import { validateAgentName, validatePrice } from '../src/utils/validation';
import { packageJson } from '../src/templates/package-json';
import { routeFile } from '../src/templates/route';

console.log('🧪 Testing CLI Utilities\n');

// ============================================================================
// VALIDATION TESTS
// ============================================================================

// Test 1: validateAgentName - valid names
const validNames = ['my-agent', 'agent123', 'my-cool-agent-2'];
for (const name of validNames) {
  const result = validateAgentName(name);
  if (result === true) {
    console.log(`✅ validateAgentName: "${name}" accepted`);
  } else {
    console.error(`❌ validateAgentName: "${name}" should be valid, got: ${result}`);
    process.exit(1);
  }
}

// Test 2: validateAgentName - invalid names
const invalidNames = [
  { name: 'MyAgent', reason: 'uppercase' },
  { name: 'my_agent', reason: 'underscore' },
  { name: 'ab', reason: 'too short' },
  { name: 'a'.repeat(51), reason: 'too long' }
];

for (const { name, reason } of invalidNames) {
  const result = validateAgentName(name);
  if (result !== true && typeof result === 'string') {
    console.log(`✅ validateAgentName: "${name}" rejected (${reason})`);
  } else {
    console.error(`❌ validateAgentName: "${name}" should be invalid`);
    process.exit(1);
  }
}

// Test 3: validatePrice - valid prices
const validPrices = [0.001, 0.01, 1.50, 100];
for (const price of validPrices) {
  const result = validatePrice(price);
  if (result === true) {
    console.log(`✅ validatePrice: $${price} accepted`);
  } else {
    console.error(`❌ validatePrice: $${price} should be valid, got: ${result}`);
    process.exit(1);
  }
}

// Test 4: validatePrice - invalid prices
const invalidPrices = [0, -1, 101];
for (const price of invalidPrices) {
  const result = validatePrice(price);
  if (result !== true && typeof result === 'string') {
    console.log(`✅ validatePrice: $${price} rejected`);
  } else {
    console.error(`❌ validatePrice: $${price} should be invalid`);
    process.exit(1);
  }
}

// ============================================================================
// TEMPLATE TESTS
// ============================================================================

const mockConfig = {
  agentName: 'test-agent',
  description: 'Test agent for summarization',
  priceUSD: 0.01,
  paymentToken: 'USDC' as const,
  agentType: 'simple' as const,
  includeExamples: true
};

// Test 5: packageJson template
try {
  const content = packageJson(mockConfig);
  const parsed = JSON.parse(content);

  if (parsed.name === 'test-agent' &&
      parsed.version === '0.1.0' &&
      parsed.dependencies['tetto-sdk'] === '^2.5.1' &&
      parsed.scripts.dev === 'next dev' &&
      parsed.engines.node === '>=20.0.0') {
    console.log('✅ packageJson: generates valid package.json');
  } else {
    throw new Error('Package.json content invalid');
  }
} catch (error) {
  console.error('❌ packageJson: failed', error);
  process.exit(1);
}

// Test 6: routeFile template
try {
  const content = routeFile(mockConfig);

  if (content.includes('createAgentHandler') &&
      content.includes('createAnthropic') &&
      content.includes('export const POST') &&
      content.includes('summary')) { // inferred from description
    console.log('✅ routeFile: generates valid route.ts');
  } else {
    throw new Error('Route file content invalid');
  }
} catch (error) {
  console.error('❌ routeFile: failed', error);
  process.exit(1);
}

// Test 7: routeFile - infers output field from description
try {
  const titleConfig = { ...mockConfig, description: 'Generate titles from text' };
  const titleContent = routeFile(titleConfig);

  const analyzeConfig = { ...mockConfig, description: 'Analyze code quality' };
  const analyzeContent = routeFile(analyzeConfig);

  if (titleContent.includes('title:') && analyzeContent.includes('analysis:')) {
    console.log('✅ routeFile: correctly infers output fields');
  } else {
    throw new Error('Output field inference failed');
  }
} catch (error) {
  console.error('❌ routeFile: inference failed', error);
  process.exit(1);
}

console.log('\n============================================================');
console.log('✅ ALL CLI TESTS PASSED!');
console.log('============================================================\n');
