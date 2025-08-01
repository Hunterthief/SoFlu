import 'package:flutter/material.dart';
import '../widgets/custom_app_bar.dart';
import '../widgets/custom_drawer.dart';
import '../theme.dart'; // Import the theme extensions

class StutteringTestScreen extends StatelessWidget {
  final bool isChildModeActive;
  final void Function(bool) toggleDarkMode;
  final void Function(bool) toggleChildMode;
  final bool isDarkModeActive;

  StutteringTestScreen({
    this.isChildModeActive = false,
    required this.toggleDarkMode,
    required this.toggleChildMode,
    required this.isDarkModeActive,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: CustomAppBar(
        onDarkModeToggle: () {
          // Handle dark mode toggle
          toggleDarkMode(!isDarkModeActive);
        },
        onLanguageChange: () {
          // Handle language change
        },
        onChildModeToggle: () {
          // Handle child mode toggle
          toggleChildMode(!isChildModeActive);
        },
        isChildModeActive: isChildModeActive,
      ),
      drawer: CustomDrawer(
        onDarkModeToggle: () {
          // Handle dark mode toggle
          toggleDarkMode(!isDarkModeActive);
        },
        onLanguageChange: () {
          // Handle language change
        },
        onChildModeToggle: () {
          // Handle child mode toggle
          toggleChildMode(!isChildModeActive);
        },
        isDarkModeActive: isDarkModeActive,
        isChildModeActive: isChildModeActive,
        onDarkModeChanged: (bool value) {
          // Handle dark mode change
          toggleDarkMode(value);
        },
        onChildModeChanged: (bool value) {
          // Handle child mode change
          toggleChildMode(value);
        },
      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: isDarkModeActive
              ? theme.customThemeData.darkSecondaryGradient
              : theme.customThemeData.lightSecondaryGradient,
        ),
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "شرح تطبيق اختبار شدة التلعثم",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDarkModeActive ? Colors.white : Colors.black,
                ),
                textAlign: TextAlign.right,
              ),
              SizedBox(height: 20),
              Text(
                """Stuttering

تحدث بعض الإضطرابات التي تؤثر علي القدره في استرسال الكلام ومن هذه الاضرابات هو التلعثم "

التهتهة " الذي يصيب عدد كبير من افراد المجتمع ( نسبة حدوثه 1%.
- ينقسم عدم انسياب الكلام الى :

أ - عدم طلاقة طبيعيه في الكلام وهي تبدأفي سن الطفوله المبكره مع بداية الكلام وتشمل تكرار
المقاطع ولا يوجد انشطار داخلي للفونيم أو وقفات وتوتر .

ب - التلعثم هو عدم انسياب الكلام اي ان السياق الطبيعي للكلام يكون مختلا بحدوث تكرار
لأصوات أو مقاطع من الكلمه او في بعض الأحيان يحدث تكرار للكلمه كلها كما تحدث أطالات
لبعض الأصوات داخل الكلمه او وقفات مع وجود انشطار داخل الصوت الواحد.

- بدء حدوث التلعثم :

قد يحدث التلعثم في سن مبكره قد يصل إلي 18 شهرا أو عند بدء تكوين الأطفال لجمل كلاميه اما
عند أقصي سن لحدوث التلعثم فهو يتراوح بين 7 سنوات او 13 سنه وعادة يحدث التلعثم في سن ما قبل
المدرسه .

- نسبة حدوث التلعتم بين الإناث والذكور :
تزيد نسبة حدوت التلعثم في الذكور عن الإنات ) 3 أو ‎٨‏ للذكور الي 1 للإناث .

- هل هو مرض وراثي ؟

من الظواهر الملحوظه في التلعثم هي زيادة فرصة حدوته بين افراد العائله التي يوجد بها تاريخ
لإصابه احد افرادها بالتلعثم بين افرادها . وقد وجد ان نسبة حدوث التلعثم في العائلات التي يوجد فيها
تاريخ لحدوث التلعثم فكانت النسبه حوال اقل من 1 مما يعضد وجود عامل وراثي في حدوث التلعثم

- التا التلعثم بين التوائم :

تلعب الوراثته دورا هاما في حدوث التعليم بين التوائم بدليل ان التلعثم يحدث بين التوائم المتماتله
اكثر من حدوثه بين التوائم الغير متماثله . وسبب التلعثم بين التوائم يرجع لعوامل البينه المحيطه والتي
تسمح للتوائم المتماثله فإنه عادة يحدث بين الفرد الأقل نموا من الناحيه الفسيولوجيه وذلك لكثرة
الضغوط الموجهه اليه ليكون بكفاءة الأخر .

- التلعثم بين ضعاف السمع :
القليله للتلعثم بين ضعاف السمع بأنهم يتكلمون اكثر بطنا ولا يعانون من ضغوط اجتماعيه كثيره في
مواقف الكلام .

- أسباب التا لتلعتم :
تعدت الأراء حول تفسير سبب التلعثم فقد ظهرت عدة نظريات لتفسير سبب حدوثه ومع ذلك مازال
سببه غامضا ومن هذه النظريات :

)أ النظريه العضويه ر٢هhe‏ عأصوي٢٥‏ : وهي تشمل

:cerebral dominance ‏1-السياده المخي4‘‎

تلعب السياده المخيه دورا هاما في النظريه العضويه لتفسير التلعثم . ونجد ان كل نصف من اعضاء
الكلام مثل الفك والشفاه واللسان يستقبل اشارات من كل الفصيين الدماغين وحتي تكون حركة اعضاء
الكلام متناسقه فإن هذه لإشارات لابد ان تكون متزامنه بدقه فإذا كانت السياده المخيه غير كامله فسوف
يحدث نتيجة لذلك اضطراب في تزامن وصول هذه النبضات من الفصين الي اعضاء الكلام وبالتالي
يحدث التلعثم وعلي هذا افتراض كل من أورتن وترافيش 1929 ان الأطفال الذين يستخدمون كلتا اليدين
بالتساوي وكذا الأطفال الذين يستخدمون اليد اليسري ويطلب منهم ان يستخدمو اليد اليمني يكونو أكثر
عرضه للتلعثم لعدم وجود سياده مخيه لأي من الفصين الدماغي واضحه لديهم .

2- نظرية دورة الفا المستشاره ityانitbحءء‏ حاد :

اعتقد بعض الباحثين بوجود عامل فسيولوجي عصبي يمكن ان يفسر التلعثم وقد اعتمدوا في ذلك علي
وجود بعض التغيرات في تخطيط كهربائية الدماغ عند المتلعثمين فقد افترض اليندلسي 1952 وجود
ارتفاع وانخفاض في الإثاره الدماغيه مصاحبه للجهد الكهربائي المكون لموجات الفا في تخطط
كهربائية الدماغ وعليه فإن خلايا القشره المخيه تكون في اقصي استثارتها في قمة الموجه وتكون غير
مستثاره في قاع الموجه وعندما تختلف ترددات خلايا الدماغ فإن توقيت استثارتها يكون مختلفا أيضا
وهذا يعني ان في جميع الأوقات توجد خليه أو أخري من خلايا الدماغ في حاله من النشاط مما يؤدي
الي سرعة الإستقبال الحسي شاملة التغذيه الحسيه المرتده وبالتالي سرعة الفعل الحركي مثل الكلام اما
اذا كانت ترددات هذه الخلايا متساويه فإنها تستثار أو تثبط في وقت واحد تقريبا ممد يحدث اضطراب
في استقبال المؤثرات الحسيه والرد عليها (كما في حالة التلعثم )وعلي هذا ففي التلعثم يكون هناك عدم
توافق بين المنبهات الحسيه والفعل الحركي للكلام مما يؤدي الي تكرار الأصوات في صوره إنشطار
داخلي للفونيم .

3- النظريه الكيمائيه الحيويه : ‎biochemical theory‏ :
بعض الأبحاث قد فسرت التلعثم علي انه تكزز كامن لتمييز التلعثم والتوتر الزائد في العضلات وقد فرق
كارلين واله 1965 بإن التكزز يحدث نتيجة لنقص الكالسيوم في الدم مع نقص فيتامين )د) ولكن في

disturbed auditory feed back : ‏اضطراب التغذيه السمعيه المرتده‎ - ٩
‏تصل التغذيه السمعيه المرتده الي الأذن الداخليه أثناء خروج الكلام عن طريق مرورو الموجات‎
: ‏الصوتيه خلال‎

1/ الهواء . 2 / العظم . 3 / الأنسجه المحيطه بالحنجره والبلعوم والفم .

وهذه التغذيه السمعيه المرتده تصل الي الدماغ يمكن ان يؤدي الي التلعثم ) سترومستا 1962 وعلي
العكس تماما فإن تأخير التغذيه السمعيه المرتده لدي المتلعثمين يجعل كلامهم أكثر طلاقه فقد قام لوتز
مان 1961 بدراسة علي 62 متلعثم ووجد ان تأخير التغذيه السمعيه المرتده بمقدار ‎٥,٥5%‏ من الثانيه

5- نظرية إخراچ الصوت : ‎vo،lization theory‏

هناك عدة طرق تجعل الكلام المتلعثم اكثر طلاقه مثل الكلام باستخدام جهاز المترونوم . الغناء . الإقتفاء
يing٥٧لطs‏ الكورال اضافة الضوضاء أو تأخير التغذيه السمعيه المرتده وادعي ونجيت 1976 ان
سبب الطلاقه في هذه المواقف المختلفه هو بطء معدل الكلام الذي يتميز بإطالة المتحركات ولذلك فسر
وينجيت حدوث التلعثم علي انه نتيجة للسلوك الذي يتبعه المتلعثم في اخراج الصوت مثل نطق
الأصوات المتحركه بطريقه مقتضبه للسلوك الذي يتبعه المتلعثم في اخراج الصوت مثل نطق الأصوات
6- النظريه العصبيه الجديدs ‎new neurological model theory‏

بإجراء فحوصات الرنين المغناطيسي تبين بدراسة نيو مان 2003 ان بعض الأجزاء من الفص الأمامي
الأيسر يوجد بها خلل وظيفي ناتج عن خلل تشريحي في شكل ممندحاءرm‏ لعرداءل وهذا ال

nمintiاءmy‏ لرداعل بدوره يؤدي الي تأخر في وصول الإشارات العصبيه اللآأزمه في اجزاء
المخ المختلفه المسؤله عن بدء الكلام ‎٠‏

7- نظرية زيادة نسبة ‎dopamine Jl‏
(جوبرمان وبلومجرين 2003 تعتمد هذه النظريه علي زيادة نسبة الدوربامين في اجزاء معينه يؤدي

الي ظهور التلعثم .
أظهرت دراسة جوبرمان وبلوجرين ان بإستخدام النظائر المشعه تبين زيادة عدد مستقبلات الدوبامين
في الفص الأيسر للمخ عند المتلعثمين .

ب- النظريه العصابيه لتفسير التلعثم y٢theoءiه٢uءn‏

من النظريات التي وضعت لتفسير التلعثم هو النظريه العصابيه ويتميز السلوك العصابي عادة بثلاث
2 - عدم القدره علي تقبل هذا الشعور
3 - أعراض وأشكال من السلوك تعبر عن هذا الشعور وتجعله مستمرا (فانز ابير 1971
وقد ارجع فرويد 1966 التلعثم الي انه مرض عصابي ينشأ نتيجةلعوامل الضغط النفسي من اهمها
تجربة فشل التحدث مع الآخرين وقد رأي فان رابير 1971 اي ان أعراض عصبيه في التلعثم ما هي
الا نتيجة لعمليه تعليميه اي ان هذه الأعراض تعتبر كوسيله دفاعيه يتعلمها المتلعثم عندما يشعر
بالإحباط او اضطهاد من المجتمع عند حدوث التلعثم وفي بادئ الأمر تكون هذه الأعراض العصبيه
وسيله لتقليل التلعثم ولكن في النهايه تصبح سمة من سماته .

وقد اجريت عدة دراسات لتوضيح دور الوالدين في خلق الصراع الذي يسبب العصابيه لأطفالهم فقد
اقيمت دراسه علي 48 أم بعضهم امهات لأطفال متلعثمين بالتسلط والنقض وإجبار اطفالهم علي اتباع
النظام المتشدد والنقض الدائم (مونكير 1952 )وبإختبار 30 ام من امهات المتلعثمين الذكور و٥3‏ ام من
امهات الأطفال الغير متلعثمين توصل (كنيسلتر 1961 )الي امهات الأطفال المتلعثمين ينبذون اطفالهم
اكثر من امهات الأطفال غير المتلعثمين .
ج- النظريه التعليمي‘ ‎LEARNING THEORY‏ :

تمثل هذه النظريه مجموعه اخري من النظريات التي وضعت لتفسير التلعثم وقد بدأ ربط النظريه
التعليميه بحدوث التلعثم لأن كثيرا من اعراض وسمات التلعثم توضح أثر التعلم مثل الخوف من موقف
معين او كلمه معينه وعلي الرغم من ذلك لا توجد نظريه واحده من تلك النظريات تفسر كمل ما يتعلق
بمشكلة التعلثم ) فان رابير 1971 .
1- تفسير التلعثم علي أنه تشريط أداني ‎OPERANT CONDITIONING‏

معظم التفسيرات التي ترجع سبب التلعثم الي أنه تشريط أدائي تعتمد علي وجود تعزيز
‎REINFOREMENT‏ لعدم الطلاقه الطبيعيه التي تحدث لكل الأطفال تقريبا في مرحله اكتساب اللغه فقد
أوضح شامس وشيريك 1963 انه عند حدوث عدم الطلاقه الطبيعيه لبعض الأطفال يمكن ان تختفي هذه
الظاهره ان لم تجد رد فعل ( تعزيز من الأباء بغض النظر عن عدد مرات التكرار للمقاطع أو نوعها
وهذه التعزيزات إما ان يكون ايجابيا في صوره اهتمام من جانب الأباء وعندئذ تزداد عدم الطلاقه
وتصيح سمة من سمات الكلام عند الطفل او يكون سلبيا في صوره رفض او احباط للطفل مما يؤدي
الي ظهور رد فعل التفادي عنده وقد اعتبر فان رابير 1971 هذا تفسيرا للتغيرات التي تحدث اثناء
مراحل تطور التلعثم واستمراره ايضا .
2- تفسير التلعثم علي انه تشريط كلاسيكي ‎٢١٨S١٢٨ ٥٨١٦٢١٥٨٧١١٤‏
يرجع بعض انصار التشريط الكلاسيكي السبب الرئيسي لحدوث التلعثم الي تأثير الإنفعلالات النفسيه
علي الكلام مثل الشعور بالإحباط أو الإحساس بعد الرضا من جانب المستمع والخوف منه او من عقابه
مثل تلك الإنفعالات تؤدي الي انقطاع في تكوين الرساله الكلاميه وعدم القدره علي التعبير عنها فمثلا
اذا حدث خوف او قلق اثناء الكلام بحدث اضطراب في تكوين التفكير المتسلسل اللازم لاخراج الكلام
المسترسل .
واذا كان الخوف بقدر كبير فإنه ايضا يحدث خلل في التنسيق المعقد الذي يلزم لإخراج الكلام ولذلك
يتوقف عن الطعام ويقفز تلقائيا عندما يسمع نغمه معينه والتي كانت دائما ما تصاحب بصدمه كهربائيه
من قبل (فان رايبر 1971 .
3 - نظرية العاملين ( التشريط الأدائي والكلاسيكي .
جمع بروتين وشوميكر 1967 نظريه اللنشريط الفعال والكلاسيكي معا ليفسرا حدوث التلعثم فقد اعتقد ان
التكرار والإطاله قد يكونا نتيجة للإنفعالات السلبيه من خلال التشريط الكلاسيكي أما التفادي فهو رد
فعل يتعلمه المتلعثم من خلال التشريط الأدائي لإخفاء اللتلعثم .

. ‏تفسر التلعثم علي انه صراع بين الإقتراب والتفادي‎ - ٩

Avoidance approach conflict
‏افترض شيهان 1985 ان الصراعات المؤلمه في الحياه هي عندما يصبح الإنسان حائرا بين رغبات‎
‏متضاده ولذلك ينشأ التوتر خاصة عندما يزيد الاحتياج للشيئين المتضادين متتساويان وينتهيهذا التوتر‎
‏عندما يزيد الاحتياج الي شئ عن الأخر وقد رأي شيهان أنه عندما يريد المتلعثم الكلام اكثر من رغبته‎
‏في الصمت فهو يتكلم بطلاقه وإذا كانت رغبته للصمت اكبر من رغبته في الكلام فهو يظل صامتا اما‎
‏عندما تكون الرغبه في الكلام مساويه للرغبه في الصمت فهنا يظهر التلعثم وقد قسم شيهان الرغبات‎
‏المتضاده الي مستويات‎
‏مستوي الكلمه : عندما يحدث خوف أو صعوبه في نطق الكلمه‎ - 1
‏مستوي الموقف :عندما يواجه المتلعثم رغبتين متضادتين للدخول في هذا الموقف او الإبتعاد عنها‎ - 2
‏مستوي الإنفعالات العاطفيه : عندما يريد المتلعثم التعبير عن البعض او الحب لشنخص ما‎ - 3
‏مستوي العلاقات مع الأشخاص : عندما يشعر المتلعثم بالقلق والتوتر عند الحديث مع بعض‎ - ٩
‏الأشخاص خاصة ذوي السلطه‎
‏مستوي حماية الأنا : عندما ينشأ الصراع بسبب التنافس الذي يحدث عندما يكون هناك احتمال‎ - 5
. ‏للفشل او النجاح‎
anticipatory theory ‏النظريه التوقعيه للتلعثم‎ - 6
‏افترض وينشنر 1950 ان اي كائن يتعلم تفادي المنبه غير المحبب اله وهذا يتوقف علي ما سبق هذا‎
‏المنبه أو توقعه له وهذا ما يحدث بالنسبه للمتلعثم عندما يتوقع الخوف من كلمه او موقف معين فهو‎
‏يتلعثم بشده فقد رأي وينشر أن التلعثم يحدث عندما يشعر الشخص بللتوتر والقلق نتيجة رد فعل المستمع‎
‏له لكن إذا إختفي هذا الشعور او تعلم المريض كيف يتخلص من شعوره بالقلق والخوف بسلوك التفادي‎
‏فسوف يقلل التلعثم لديه‎
: ‏أساس مشكلة التلعثم‎
‏هو خوف الطفل من الكلام فهو يكون تلميذا عاديا ولكنه يخاف ان يتلعثم في الفصل ويخاف القرأه او‎
‏الإجابه امام زملانه حتي لايتعرض لسخريتهم او تعليقاتهم الجارحه التي تؤذي مشاعره وتزيد من‎
‏مشكلة التلعثم لديه وأقسي شئ للطفل ان تكون هذه السخريه صادره من أقرب الناس اليه وهم والديه‎
‏واخوته وقد يظن المدرسالذي لا يعرف ان هذا مرضا ان الطفل يتلعثم لأنه لم يذاكر الدرس جيدا وهو‎
: ‏الخوف‎
‏يعتبر الخوف من اهم الأشياء التي يشعر بها المتلعثم ويختلف شعور الخوف من مريض الي آخر وفي‎
‏نفس المريض من وقت لآخر وقد يكون سبب الخوف هو رد الفعل الذي ينتظره المريض من المستمع‎
‏سواء برفضه كلامه او عدم انصاته له او سخريته من طريقة كلامه او يكون الخوف نتيجة لتوقع‎
‏المريض العجز عن الكلام لخبرته السابقه عن عدم قدرته علي الكلام بلباقه والكلام هو وسيلة الإنسان‎
‏للتعبير عن الذات‎
‏بعض العوامل التى تعجل بحدوث التلعثم لدي المريض‎

من أهم العوامل الشائعه التي تعجل بحدوث التلعثم هو طبيعة المستمع فمعظم المصابين بالتلعثم يخشون
التحدث اما ناس ذو السلطه او امام اساتذتهم ومدرسيهم وبعض المواقف تزيد منه مثل الامتحانات او
التقدم لإجراء مقابلات للإلتحاق بالعمل أو أثناءالتعرف علي مجموعه جديده من الأصدقاء يقابلهم لأول
مره وكذلك أثناء استخدام التليفون وأمام الجنس الآأخر

لذلك نجد المتلعثم يفضل ان يحصر صداقته في عدد محدود من الأشخاص لا يزيد عن ثلاثة أشخاص
وغالبا يكون له صديق واحد فقط يتحدث امامه بدون خجل من مشكلة تلعثم لذلك نجده يتجنب عقد
صداقات جديده ويخشي أن يتواجد في مواقف تستدعي منه ان يتكلم أو يعبر عن أفكاره ونجده يخشي
الحديث في التليفون أو الذهاب لشراء أي شئ يحتاجه بل يفضل العزله والوحده ولا يميل الي اتخاذ
مواقف جديده او ايجابيه وبخاصة امام مجموعات

ونجد عند بعض الأطفال ان التلعثم مرتبط بالفصل الدراسي او مرتبط بشخص معين قد يكون والده او
احد مدرسيه وغالبا ما يوجد لدي المتلعثم خوف من كلمة معينه اوحرف معين وغالبا هذه الكلمات يكون
فيها حروف اسمه هو

التوتر :

ينشا التوتر خاصة عندما يكون الإحتياج لشيئين متضادتين متساويين وينتهي هذا التوتر عندما يزيد
الإحتياج لشئ عن الآخر
""",
                style: TextStyle(
                  fontSize: 16,
                  color: isDarkModeActive ? Colors.white70 : Colors.black87,
                ),
                textAlign: TextAlign.right,
                textDirection: TextDirection.rtl,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
