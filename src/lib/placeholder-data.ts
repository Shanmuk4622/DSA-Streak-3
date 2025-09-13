
import type { Problem } from './dsa';
import { subDays } from 'date-fns';

const today = new Date();

export const placeholderProblems: Problem[] = [
  { id: '1', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', topic: 'Array', difficulty: 'Easy', date: subDays(today, 1) },
  { id: '2', title: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', topic: 'Linked List', difficulty: 'Medium', date: subDays(today, 1) },
  { id: '3', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', topic: 'String', difficulty: 'Medium', date: subDays(today, 2) },
  { id: '4', title: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', topic: 'Binary Search', difficulty: 'Hard', date: subDays(today, 3) },
  { id: '5', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', topic: 'Array', difficulty: 'Medium', date: subDays(today, 5) },
  { id: '6', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', topic: 'Stack', difficulty: 'Easy', date: subDays(today, 5) },
  { id: '7', title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', topic: 'Heap', difficulty: 'Hard', date: subDays(today, 5) },
  { id: '8', title: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', topic: 'Tree', difficulty: 'Easy', date: subDays(today, 6) },
  { id: '9', title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', topic: 'Tree', difficulty: 'Easy', date: subDays(today, 8) },
  { id: '10', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', topic: 'Dynamic Programming', difficulty: 'Medium', date: subDays(today, 10) },
  { id: '11', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', topic: 'Graph', difficulty: 'Medium', date: subDays(today, 10) },
  { id: '12', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', topic: 'Graph', difficulty: 'Medium', date: subDays(today, 12) },
].sort((a,b) => a.date.getTime() - b.date.getTime());
