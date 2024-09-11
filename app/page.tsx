import Image from 'next/image';
import styles from './page.module.css';
import FAQ from './faq/page';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Main page</h1>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
