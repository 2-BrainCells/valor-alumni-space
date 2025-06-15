
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Plus, 
  Minus, 
  Gift, 
  Users, 
  Star,
  ChevronDown 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  category: 'check-in' | 'referral' | 'achievement' | 'purchase' | 'connection';
  amount: number;
  description: string;
  timestamp: Date;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Sample transaction data
  const generateTransactions = (offset: number = 0): Transaction[] => {
    const types: Array<Transaction['category']> = ['check-in', 'referral', 'achievement', 'purchase', 'connection'];
    const descriptions = {
      'check-in': 'Daily check-in reward',
      'referral': 'Referred a job opportunity',
      'achievement': 'Achievement unlocked',
      'purchase': 'Purchased referral access',
      'connection': 'New connection made',
    };

    return Array.from({ length: 10 }, (_, i) => {
      const category = types[Math.floor(Math.random() * types.length)];
      const isEarned = category !== 'purchase';
      const amount = isEarned 
        ? Math.floor(Math.random() * 200) + 50 
        : Math.floor(Math.random() * 100) + 25;

      return {
        id: `tx-${offset + i}`,
        type: isEarned ? 'earned' : 'spent',
        category,
        amount,
        description: descriptions[category],
        timestamp: new Date(Date.now() - (offset + i) * 3600000),
      };
    });
  };

  useEffect(() => {
    setTransactions(generateTransactions());
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newTransactions = generateTransactions(transactions.length);
      setTransactions(prev => [...prev, ...newTransactions]);
      setLoading(false);
      
      // Simulate end of data after 50 transactions
      if (transactions.length >= 40) {
        setHasMore(false);
      }
    }, 1000);
  };

  const getTransactionIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'check-in':
        return <Gift className="h-4 w-4" />;
      case 'referral':
        return <Users className="h-4 w-4" />;
      case 'achievement':
        return <Star className="h-4 w-4" />;
      case 'purchase':
        return <Minus className="h-4 w-4" />;
      case 'connection':
        return <Plus className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-0">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`
                    p-2 rounded-full
                    ${transaction.type === 'earned'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                    }
                  `}
                >
                  {getTransactionIcon(transaction.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(transaction.timestamp)}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`
                      font-semibold text-sm
                      ${transaction.type === 'earned'
                        ? 'text-green-600'
                        : 'text-red-600'
                      }
                    `}
                  >
                    {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">coins</p>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                onClick={loadMore}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    Load More
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {!hasMore && transactions.length > 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              You've reached the end of your transaction history
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
