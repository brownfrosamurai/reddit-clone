import { Community } from '@/src/atoms/communitiesAtom';
import CreatePostLink from '@/src/components/Communities/CreatePostLink';
import Header from '@/src/components/Communities/Header';
import NotFound from '@/src/components/Communities/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

type communityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {
    if (!communityData) {
        return <NotFound />;
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink/>
                </>
                <>
                    <div>RHS</div>
                </>
            </PageContent>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(
                          safeJsonStringify({
                              id: communityDoc.id,
                              ...communityDoc.data()
                          })
                      )
                    : ''
            }
        };
    } catch (error) {
        // TODO add error page
        console.log('getServerSideProps error', error);
    }
}

export default CommunityPage;
