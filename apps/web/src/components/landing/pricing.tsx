import React, { useState } from 'react';
import { Card } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '@/helper/axios';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface PlanCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    onClick: () => void;
    buttonClass: string;
    bgColor: string;
    loading?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, features, buttonText, onClick, buttonClass, bgColor, loading }) => (
    <Card className={`flex flex-col justify-between border p-8 w-full max-w-sm text-left rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${bgColor}`}>
        <div>
            <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${buttonClass}`}>{title}</span>
                <h2 className="text-3xl font-bold">{price}</h2>
            </div>
            <p className="text-lg mb-6">{description}</p>
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> {feature}
                    </li>
                ))}
            </ul>
        </div>
        <Button
            variant="neutral"
            className={`mt-8 w-full py-3 font-semibold rounded-lg ${buttonClass}`}
            onClick={onClick}
            disabled={loading}
        >
            {loading && title === 'Premium' ? 'Loading...' : buttonText}
        </Button>
    </Card>
);

const Pricing: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { user, isLoggedIn } = useAuth();   
    const router = useRouter();

    const handleFreePlanClick = () => {
        if (!isLoggedIn) {
            return router.push('/sign-in');
        }
        alert('You selected the Free Plan!');
    };

    const handlePremiumPlanClick = async () => {
        if (!isLoggedIn) {
            return router.push('/sign-in');
        }
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/stripe/create-subscription-session', {
                email: user?.email,
                name: user?.name,
            });
            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
                if (error) console.error(error.message);
            } else {
                console.error("Stripe failed to initialize.");
            }
        } catch (error) {
            console.error('Error creating subscription:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center px-6 py-20 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">Our Pricing Plans</h1>
            <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-10 lg:space-y-0 w-full max-w-9xl justify-center">
                <PlanCard
                    title="Free"
                    price="$0"
                    description="Ideal for trying out basic features"
                    features={[
                        "Basic mock interviews",
                        "AI-generated feedback",
                        "Limited question sets",
                        "Email support"
                    ]}
                    buttonText="Choose Free Plan"
                    onClick={handleFreePlanClick}
                    buttonClass="bg-gray-800 text-white hover:bg-gray-700"
                    bgColor="bg-white"
                />
                <PlanCard
                    title="Premium"
                    price="$10"
                    description="Best for professional users"
                    features={[
                        "Unlimited mock interviews",
                        "Advanced AI feedback",
                        "Unlimited question sets",
                        "Priority support"
                    ]}
                    buttonText="Choose Premium Plan"
                    onClick={handlePremiumPlanClick}
                    buttonClass="bg-purple-600 hover:bg-purple-500 text-white"
                    bgColor="bg-gray-900 text-white"
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Pricing;
