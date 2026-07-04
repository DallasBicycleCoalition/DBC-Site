import { Card, Flex } from '@sanity/ui';
import type { PropsWithChildren } from 'react';

type FeedbackCardProps = PropsWithChildren<{
  tone?: 'default' | 'transparent' | 'primary' | 'positive' | 'caution' | 'critical';
}>;

export function FeedbackCard({ children, tone = 'primary' }: FeedbackCardProps) {
  return (
    <Card tone={tone} padding={4} radius={3} border>
      <Flex>{children}</Flex>
    </Card>
  );
}
