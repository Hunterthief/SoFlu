import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import AudioPlayer from '../components/AudioPlayer';

const StoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StoryHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: ${props => props.theme.gradients.surface};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const StoryTitle = styled.h1`
  font-size: 2.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
`;

const AudioSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StoryContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: 30px;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.medium};
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  
  p {
    margin-bottom: 20px;
    text-align: justify;
  }
  
  .story-paragraph {
    margin-bottom: 24px;
    padding: 16px;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    border-left: 4px solid ${props => props.theme.colors.primary};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.background};
  border-radius: 2px;
  margin: 20px 0;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  border-radius: 2px;
`;

const StoryPage = () => {
  const { t } = useTranslation();
  const { storyId } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    loadStoryData();
  }, [storyId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setReadingProgress(Math.min(scrollPercent, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadStoryData = async () => {
    setLoading(true);
    
    try {
      // Try to load story content from JSON file
      const response = await fetch(`/content/stories/${storyId}.json`);
      
      if (response.ok) {
        const data = await response.json();
        setStoryData(data);
      } else {
        // Fallback to hardcoded stories
        setStoryData(getHardcodedStory(storyId));
      }
    } catch (error) {
      console.error('Failed to load story:', error);
      setStoryData(getHardcodedStory(storyId));
    } finally {
      setLoading(false);
    }
  };

  const getHardcodedStory = (id) => {
    const stories = {
      'lazy-rabbit': {
        titleKey: 'stories.lazyRabbit',
        audioPath: '/content/audio/stories/lazy-rabbit.mp3',
        content: `في يوم من الأيام، كان هناك أرنب صغير يُدعى "كسول". كان الأرنب يعيش في غابة جميلة مليئة بالأشجار العالية والزهور الملونة. وكان "كسول" يحب النوم واللعب طوال اليوم، وكان يكره العمل أو بذل أي جهد.

ذات صباح، اجتمع جميع حيوانات الغابة للتخطيط لجمع الطعام من أجل فصل الشتاء القادم. قال الثعلب: "علينا أن نجمع الكثير من الطعام لنستعد للشتاء، فالثلج سيغطي الأرض ولن نجد شيئًا نأكله". وافق الجميع، وبدأ كل حيوان في العمل بجد.

أما الأرنب "كسول"، فقد قال لنفسه: "لماذا أعمل وأتعب؟ الشتاء بعيد، سأستمتع بوقتي الآن". وبدلاً من العمل، ذهب لينام تحت شجرة كبيرة. وبقي الأرنب على حاله لأيام عديدة، لا يفعل شيئًا سوى النوم واللعب.

ومرت الأيام، وجاء الشتاء بثلوجه الباردة. استيقظ الأرنب "كسول" في يوم شديد البرودة، وكان جائعًا جدًا. خرج من منزله يبحث عن الطعام، ولكنه لم يجد شيئًا. توجه إلى أصدقائه يطلب المساعدة، فذهب إلى الثعلب وقال: "هل يمكنك أن تعطيني بعض الطعام؟ أنا جائع جدًا!" نظر الثعلب إليه وقال: "ألم تقم بجمع الطعام عندما كنا نعمل؟". شعر الأرنب بالخجل ولم يعرف ماذا يقول.

بعدها ذهب إلى السنجاب، وطلب منه الطعام، فقال السنجاب: "لقد عملت بجد لجمع الطعام طوال الصيف، وأنت كنت نائمًا. الآن عليك أن تتحمل عاقبة كسلك".

وأخيرًا، ذهب الأرنب إلى عائلة الأرانب التي تعيش بالقرب منه، وطلب منهم المساعدة. قررت عائلة الأرانب مساعدته، وأعطته بعض الطعام. ولكنه تعلم درسًا مهمًا في ذلك اليوم. قال الأرنب لنفسه: "العمل الجاد والمشاركة مع الآخرين هما مفتاح السعادة. لن أكون كسولاً مرة أخرى!"

ومنذ ذلك اليوم، بدأ الأرنب "كسول" يعمل بجد ويشارك أصدقاءه في جمع الطعام وتحضير مستلزمات الشتاء. وتعلم أن الوقت لا ينتظر أحدًا، وأن العمل الجاد هو الطريق الوحيد للنجاح.`
      },
      'proud-mouse': {
        titleKey: 'stories.proudMouse',
        audioPath: '/content/audio/stories/proud-mouse.mp3',
        content: `قصة الفأر المغرور - المحتوى قادم قريباً...`
      }
    };

    return stories[id] || {
      titleKey: 'common.error',
      content: 'Story not found'
    };
  };

  if (loading) {
    return (
      <PageTemplate loading={true} />
    );
  }

  if (!storyData) {
    return (
      <PageTemplate error="Story not found" />
    );
  }

  const paragraphs = storyData.content.split('\n\n').filter(p => p.trim());

  return (
    <PageTemplate showBreadcrumbs={true}>
      <StoryContainer>
        <ProgressBar>
          <Progress
            initial={{ width: 0 }}
            animate={{ width: `${readingProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </ProgressBar>

        <StoryHeader>
          <StoryTitle>{t(storyData.titleKey)}</StoryTitle>
          
          {storyData.audioPath && (
            <AudioSection>
              <AudioPlayer 
                audioPath={storyData.audioPath}
                label={t(storyData.titleKey)}
              />
            </AudioSection>
          )}
        </StoryHeader>

        <StoryContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              className="story-paragraph"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <p>{paragraph}</p>
            </motion.div>
          ))}
        </StoryContent>
      </StoryContainer>
    </PageTemplate>
  );
};

export default StoryPage;