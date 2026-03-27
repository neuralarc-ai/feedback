import { useState, type FormEvent } from 'react';
import EmojiRating from './EmojiRating';
import RatingSlider from './RatingSlider';

interface FeedbackFormProps {
  type: 'website' | 'product';
  scriptUrl: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface TopicItem {
  name: string;
  question: string;
}

const TOPICS_WEBSITE: TopicItem[] = [
  { name: 'UI / Visual Design', question: 'How visually appealing and modern does the website feel?' },
  { name: 'Navigation', question: 'How easy was it to find what you were looking for?' },
  { name: 'Content Clarity', question: 'How clear, relevant, and helpful is the content on the website?' },
  { name: 'Information Structure', question: 'How well is the information organized and structured?' },
  { name: 'Responsiveness', question: 'How well does the website adapt across devices?' },
];

const TOPICS_PRODUCT: TopicItem[] = [
  { name: 'Features', question: 'How useful and relevant are the features provided?' },
  { name: 'User Interface', question: 'How visually clear and well-designed is the product interface?' },
  { name: 'Performance', question: 'How reliable and responsive is the product during use?' },
  { name: 'Reliability', question: 'How consistent and error-free is the product experience?' },
  { name: 'Output Quality', question: 'How satisfied are you with the quality of results produced by the product?' }
];


export default function FeedbackForm({ type, scriptUrl }: FeedbackFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [touched, setTouched] = useState(false);

  const isProduct = type === 'product';
  const topics = isProduct ? TOPICS_PRODUCT : TOPICS_WEBSITE;

  const [topicRatings, setTopicRatings] = useState<Record<string, number>>(
    Object.fromEntries(topics.map((t) => [t.name, 0]))
  );

  const nameError = touched && name.trim() === '' ? 'Name is required' : '';
  const emailError = touched && email.trim() === '' ? 'Email is required' : touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email' : '';
  const ratedTopicCount = Object.values(topicRatings).filter((v) => v > 0).length;
  const topicError = touched && ratedTopicCount < 3 ? `We’d love to hear a bit more from you — please rate at least 3 topics.(${ratedTopicCount}/3)` : '';
  const overallError = touched && overallRating === 0 ? 'Please select a rating' : '';
  const commentError = touched && comment.trim() === '' ? 'Comment is required' : '';

  const handleTopicRate = (topic: string, value: number) => {
    setTopicRatings((prev) => ({ ...prev, [topic]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (overallRating === 0 || comment.trim() === '' || name.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || ratedTopicCount < 3) return;

    setStatus('submitting');
    try {
      const payload = {
        type,
        name: name.trim(),
        email: email.trim(),
        overallRating,
        topicRatings,
        comment: comment.trim(),
        timestamp: new Date().toISOString(),
      };

      await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setStatus('success');
      setName('');
      setEmail('');
      setOverallRating(0);
      setComment('');
      setTopicRatings(Object.fromEntries(topics.map((t) => [t.name, 0])));
      setTouched(false);
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-na-border bg-na-bg px-4 py-3 text-na-white placeholder-na-text-dim text-base outline-none transition-all duration-200 focus:border-na-border-light focus:ring-1 focus:ring-na-border-light/50';

  const labelClasses = 'block text-sm font-medium text-na-text-muted mb-2 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor={`name-${type}`} className={labelClasses}>
          Name <span className="text-error">*</span>
        </label>
        <input
          id={`name-${type}`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClasses}
        />
        {nameError && <p className="text-error text-sm mt-2 animate-fade-in">{nameError}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor={`email-${type}`} className={labelClasses}>
          Email <span className="text-error">*</span>
        </label>
        <input
          id={`email-${type}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className={inputClasses}
        />
        {emailError && <p className="text-error text-sm mt-2 animate-fade-in">{emailError}</p>}
      </div>


      {/* Topic Ratings */}
      <div>
        <label className={labelClasses}>Rate by Topic</label>
        {topicError && <p className="text-error text-sm mb-2 animate-fade-in">{topicError}</p>}
        <div className="space-y-3">
          {topics.map((topic) => (
            <div key={topic.name}>
              <span className="text-md font-medium text-na-white">{topic.name}</span>
              <p className="text-md text-na-text-muted leading-relaxed mt-0.5 mb-1">{topic.question}</p>
              <EmojiRating rating={topicRatings[topic.name]} onRate={(r) => handleTopicRate(topic.name, r)} />
            </div>
          ))}
        </div>
      </div>

      {/* Overall Rating */}
      <div>
        <label className={labelClasses}>
          Overall Rating <span className="text-error">*</span>
        </label>
        <RatingSlider value={overallRating} onChange={(r) => { setOverallRating(r); }} />
        {overallError && <p className="text-error text-sm mt-3 animate-fade-in">{overallError}</p>}
      </div>

      {/* Comment */}
      <div>
        <label htmlFor={`comment-${type}`} className={labelClasses}>
          Comment <span className="text-error">*</span>
        </label>
        <textarea
          id={`comment-${type}`}
          value={comment}
          onChange={(e) => { setComment(e.target.value); }}
          placeholder="Share your thoughts..."
          rows={4}
          className={`${inputClasses} resize-none`}
        />
        {commentError && <p className="text-error text-sm mt-2 animate-fade-in">{commentError}</p>}
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full sm:w-1/2 rounded-full font-semibold py-3 px-4 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-na-surface cursor-pointer ${
            isProduct
  ? 'bg-gradient-to-r from-[#FF5BA7] via-[#FF7AC3] to-[#FF99CCCC] text-white hover:opacity-90'
  : 'bg-gradient-to-r from-[#0091C9] via-[#00B4D8] to-[#48CAE4] text-white hover:opacity-90'
          }`}
        >
        {status === 'submitting' ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : 'Submit Feedback'}
        </button>
      </div>

      {status === 'success' && (
        <div className="rounded-lg bg-success-bg border border-success/20 text-success text-base p-4 text-center animate-fade-in">
          ✓ Thank you for your feedback!
        </div>
      )}
      {status === 'error' && !overallError && !commentError && (
        <div className="rounded-lg bg-error-bg border border-error/20 text-error text-base p-4 text-center animate-fade-in">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
