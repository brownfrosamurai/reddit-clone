import { Community } from '@/src/atoms/communitiesAtom';
import { Post } from '@/src/atoms/postAtom';
import { firestore } from '@/src/firebase/clientApp';
import usePost from '@/src/hooks/usePosts';
import { collection, getDocs, orderBy, query, Query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type PostsProps = {
    communityData: Community;
    userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    // useAuthState
    const [loading, setLoading] = useState(false);
    const { postStateValue, setPostStateValue } = usePost();

    const getPosts = async () => {
        try {
            // get posts for this community
            const postsQuery = query(
                collection(firestore, 'posts'),
                where('communityId', '==', communityData.id),
                orderBy('createdAt', 'desc')
            );

            const postDocs = await getDocs(postsQuery);
            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[]
            }));

        } catch (error: any) {
            console.log('getPosts error: ', error.message);
        }
    };

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>Posts</div>;
};
export default Posts;
