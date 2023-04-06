import Image from 'next/image'
import YoutubeEmbed from './YoutubeEmbed'
export function AIEduContents() {
    return (
        <div className=" my-5 mx-5 text-lg">
            <h1 className="font-bold text-3xl mt-16 mb-8">
                What is Artificial Intelligence (AI)?
            </h1>
            <div className="space-y-5">
                <div className="flex mr-10 space-x-5">
                    <p className="mr-10">
                        AI is an all-encompassing term for a range of
                        technologies that allow machines to accomplish tasks
                        that generally require human intelligence. The main
                        objective of AI is to create computer systems that can
                        learn, reason and make decisions using data. This field
                        is constantly evolving and advancing with new
                        innovations and discoveries happening daily.
                    </p>

                    <Image
                        src="/ai_img.jpg"
                        width="400"
                        height="200"
                        alt="ai_img.jpg"
                    />
                </div>
                <p>
                    There are different types of AI each with its own advantages
                    and drawbacks. For instance, rule-based AI relies on
                    predefined rules to make decisions while machine learning
                    trains algorithms on large datasets to recognize patterns
                    and make predictions. Deep learning, a subset of machine
                    learning, uses artificial neural networks to learn from
                    data. Another crucial aspect of AI is natural language
                    processing which aims to enable machines to understand and
                    generate human language.
                </p>
                <p>
                    AI presents numerous opportunities to solve complex problems
                    and create new avenues for growth. For instance, AI can
                    assist in disease diagnosis, increase energy efficiency in
                    buildings, and predict natural disasters. In business, AI
                    can be used to automate repetitive tasks, personalize
                    customer experiences, and improve operations.
                </p>
                <p>
                    Nonetheless, AI also presents potential ethical and
                    practical challenges. A significant concern is the
                    possibility of algorithmic bias, leading to unfair or
                    discriminatory decision-making. Additionally, automation may
                    cause job displacement and income inequality. It is crucial
                    that individuals and organizations consider these challenges
                    and find ways to mitigate them as AI continues to advance.
                </p>
                <p>
                    Despite these issues, AI is expected to keep growing and
                    innovating in the years to come. With the increasing
                    availability of data and computing power, AI has limitless
                    potential to transform various aspects of our lives.
                    Regardless of whether you are a student, a business leader
                    or simply an enthusiast of the latest technology trends, it
                    is becoming increasingly crucial to understand the
                    fundamentals of AI in today's world.
                </p>
            </div>
            <h1 className="font-bold text-3xl mt-16 mb-8">What is Dall-E 2?</h1>
            <div className="space-y-5">
                <p>
                    Recently, DALL-E 2, an innovative model developed by OpenAI,
                    has impressed many by generating and manipulating images
                    with incredible accuracy. By inputting a short text prompt,
                    DALL-E 2 can create brand new images that merge different
                    and unrelated objects in logical ways. The model is capable
                    of modifying existing images, generating image variations
                    while retaining the key features, and also creating smooth
                    transitions between two input images. The exceptional
                    results produced by DALL-E 2 have intrigued many people, and
                    they are eager to know the mechanisms behind its
                    functionality. In this section, we will explore how DALL-E 2
                    generates such extraordinary images by providing background
                    information and explanation at various levels, making it an
                    accessible read for readers with different levels of machine
                    learning experience.
                </p>
            </div>
            <h1 className="font-bold text-3xl mt-16 mb-8">
                How does Dall-E 2 work?
            </h1>
            <div className="space-y-5">
                <p>
                    To begin, let's first understand how DALL-E 2 generates
                    images at a high level before delving into the specifics of
                    its functioning. Although DALL-E 2 can accomplish many
                    tasks, such as modifying and interpolating images, this
                    article will concentrate on its image generation ability.
                </p>
                <div className="grid  place-items-center">
                    <Image
                        src="/dall_e_logic.png"
                        alt="dall_e_logic.png"
                        height="400"
                        width="700"
                    />
                </div>
                <p>
                    The process of how DALL-E 2 works can be simplified as
                    follows:{' '}
                </p>
                <ol className="list-decimal list-inside">
                    <li>
                        Firstly, a text prompt is fed into a text encoder that
                        is designed to convert the prompt into a representation
                        space.
                    </li>
                    <li>
                        Next, the prior model maps the text encoding to an image
                        encoding that captures the semantic information of the
                        prompt.
                    </li>
                    <li>
                        Finally, an image decoder uses this semantic information
                        to stochastically create an image.
                    </li>
                </ol>
                <p>
                    Although this overview provides a basic understanding, there
                    are many fascinating implementation details that we will
                    cover in the following sections. If you prefer a less
                    detailed approach or prefer visual aids, you may want to
                    watch the video breakdown of DALL-E 2 available here:
                </p>
                <div className="grid  place-items-center">
                    <YoutubeEmbed embedId="F1X4fHzF4mQ" />
                </div>
            </div>
        </div>
    )
}
