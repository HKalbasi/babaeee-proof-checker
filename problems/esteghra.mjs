const baseContext = `
Require Import Arith.
Require Import Omega.
Ltac normalize := intros.

Ltac kalbas_auto := try omega; auto; normalize.

Lemma esteghra: forall P: nat-> Prop, P 0
->(forall x: nat, P x -> P (x+1)) -> forall n: nat, P n.
Proof.
  intros.
  induction n; kalbas_auto.
  replace (S n) with (n+1); kalbas_auto.
Qed.
`;

const kambizContext = `
${baseContext}
Variable kambiz: nat -> nat -> Prop.
`;

const nonZContext = `
${baseContext}
Lemma exist_minus: forall x y : nat, x <= y -> exists z, y = x + z.
Proof.
  intros.
  exists (y-x); kalbas_auto.
Qed.
`;

const listContext = `
${baseContext}

Require Import List.
Import ListNotations.
Open Scope list_scope.


Lemma list_length_zero: forall l: list nat, 0 = length l -> l = [].
Proof.
  intros.
  destruct l; auto.
  simpl in H.
  omega.
Qed.

Lemma list_length_plus_one: forall l: list nat,
forall a: nat, a + 1 = length l
-> exists t: list nat, exists k: nat, l = [k] ++ t /\\ a = length t.
Proof.
  intros.
  destruct l.
  simpl in H; omega.
  exists l.
  exists n.
  constructor; auto.
  simpl in H.
  omega.
Qed.

Lemma list_rev_def: forall (l: list nat) (a: nat), rev ([a]++l) = rev l ++ [a].
Proof.
  intros.
  auto.
Qed.

Lemma rev_nil: ((rev []):list nat) = [].
Proof.
  auto.
Qed.
`;

const s = [
`
این تمرین های استقرای اثبات چک کنه. هدف این جا یاد دادن نیست (اگرچه به نظرم
پتانسیل فوق العاده ای برای یاد دادن داره) و صرفا دموییه برای این که ببینیم تمرین
و آزمون چجوری می شه تقریبا. با این که آموزش استقرا نیست، ولی تمرین اول خیلی بیسیکه
و راجع به مفهوم استقراست. به عنوان یه اور ویو، ما شرایط استقرا رو به عنوان فرض داریم
و می خوایم قضیه رو به ازای ۵ ثابت کنیم.

اون
P: nat -> Prop
یه گزاره راجع به اعداد طبیعیه. این نماد گذاری معنیش اینه که پی یه عدد طبیعی می گیره
و یه گزاره می سازه. مثلا اگه پی باشه خوشگل بودن،
P 2
می شه «2 خوشگل است» و
P 5
می شه «5 خوشگل است» و
forall x: P x
می شه همه اعداد خوشگل هستند و
forall y: P y -> P (y+1)
معنیش اینه که به ازای هر عدد مانند ایگرگ، اگر ایگرگ خوشگل باشد آن گاه ایگرگ به علاوه یک
خوشگل است. به جای خوشگل بودن می تونید هر چیز دیگه ای بزارید. مثلا
P x
می تونه این باشه: «اگر ایکس زوج باشد آنگاه یا ایکس برابر سه نیست یا دو
برابر ایکس از ده بیشتر است» و هر چیز دیگه ای که دوست دارید.

حالا این جا فرض اول همون پایه استقراست (توی کوک اعداد طبیعی از صفر شروع می شه) و فرض
دوم گام استقراست روی گزاره دلخواه پی. و شما باید نشون بدید که گزاره پی به ازای عدد
سه برقراره. (راهنمایی: سه رو با دو به علاوه یک جایگزین کنید. اگه
خیلی بی حوصله هستید می تونید با 1+1+1 جایگزین کنید) با حل این تمرین
به درستی استقرا هم به طور شهودی پی می برید.
`,
`
حالا بریم یه مساله با استقرا حل کنیم. توی این مساله یه کامبیز داریم که روی محور اعداد
حرکت می کنه. اولش رو عدد صفر ایستاده و با گام یک می ره روی ۱. از اون به بعد یا باید
گامش رو نصف کنه و یا باید گامش رو دو برابر کنه. توی یه سری سلسله مساله می خوایم بررسی
کنیم که کامبیز به چه خونه هایی می تونه برسه. مساله رو توی اثبات چک کن این طوری مدل
می کنیم که
kambiz tool gam
یه گزارست که معنیش اینه که کامبیز می تواند به خانه شماره طول برسد و آخرین گامش به اندازه
gam
باشد. حال مدل سازی مساله را می توانید در فروض سوال ببینید. برای شروع (حالا حالا ها
با این کامبیز کار داریم 🙂) ثابت کنید که کامبیز می تواند به تمام خانه های با فرمت
3*n+1
برسد. یعنی باید ثابت کنید که گامی وجود دارد که کامبیز با آن گام به خانه
3*n+1
می رسد.

برای اثبات گزاره های وجود دارد فلان، باید یک نمونه ارائه کنید. مثلا اگر فکر می کنید که
دو بتوان ان خاصیت مذکور را دارد گزینه تاکتیک کاستوم را بزنید و بنویسید:

exists (2^n)

یه نکته دیگه هم می مونه. وقتی می خواید استقرا رو از توی پالت قضیه ها اعمال کنید، حتما
متغیر استقرا که همون ان هست رو دستی معلوم کنید چون کوک معمولا توی استقرا متغیر رو
غلط حدس می زنه و بدون این که ارور بده یه حکم مسخره و غیر قابل اثبات می زاره جلوتون
و نمی فهمید که از کجا خوردید. پس اگه مثلا می خواید روی ایکس استقرا بزنید شیفت رو نگه
دارید و بنویسید
n:=x
تا درست کار کنه. موفق باشید!
`,
`
یه خانواده از مسائل خوبی که می شه حول استقرا مطرح کرد، تعمیم های استقرا هستن. توی
این سوال باید استقرایی رو ثابت کنید که پایه صفر نداره و از یه جایی به بعد
درسته.
`,
`
دیگه کار کم کم داره جدی می شه. توی این سوال باید یه گزاره راجع به لیست ها رو
ثابت کنی. برای این که دستت راه بیفته این سوال رو مراحلش رو می گم. باید روی
طول لیست استقرا بزنی. یه متغیر جدید تعریف کن برابر طول لیست اول. بعد گزاره
برابریش و خود لیست اول رو با ابزار برگرداندن، برگردون توی حکم و بعدش
روی اون متغیری که تعریف کردی استقرا بزن. البته این رو هم امتحان کن که اگه
برنگردونی توی حکم چه اتفاقی میفته تا متوجه بشی که چرا باید برگردونی توی حکم. اگه
این رو درست یاد نگیری توی مراحل بعدی گیر می کنی و نمی تونی اون استقرایی که توی
ذهنته رو پیاده سازی کنی.
`,
`
توی
این سوال شما باید استقرای قوی رو ثابت کنید. اهمیت استقرای قوی به این دلیله که
توی گام فرض قوی تری وجود داره که می تونه اثبات گام رو راحت تر کنه. همچنین
اثبات تعمیم های استقرا قدرت استقرا رو نشون میده.

این سوال واقعا خفن و ایده داره. باید فکر کنید تا بتونید حل کنید.
`,
];

export const problems = [
  {
    context: baseContext,
    statement: s[0],
    goal: 'forall P: nat-> Prop, P 0 -> (forall x: nat, P x -> P (x+1)) -> P 3',
  },
  {
    context: kambizContext,
    statement: s[1],
    tools: { custom: 'enable' },
    pallete: {
      'esteghra': 'استقرا',
    },
    goal: `kambiz 1 1
->(forall tool gam: nat , kambiz tool gam -> kambiz (tool+2*gam) (2*gam))
->(forall tool gam: nat , kambiz tool (2*gam) -> kambiz (tool+gam) (gam))
-> forall n: nat, exists k: nat, kambiz (3*n+1) k
    `,  
  },
  {
    context: nonZContext,
    statement: s[2],
    pallete: {
      'esteghra': 'استقرا',
      'exist_minus': 'نابرابری و وجود اختلاف',
    },
    goal: `forall P: nat-> Prop, forall k: nat, P k
    ->(forall x: nat, P x -> P (x+1)) -> forall n: nat, k <= n -> P n`,
  },
  {
    context: listContext,
    statement: s[3],
    pallete: {
      'esteghra': 'استقرا',
      'list_length_zero': 'لیست با طول صفر',
      'list_length_plus_one': 'لیست با طول x+1',
      'list_rev_def': 'تعریف معکوس لیست',
      'app_assoc_reverse': 'شرکت پذیری چسباندن',
      'app_nil_l': 'چسباندن به خالی از چپ',
      'app_nil_r': 'چسباندن به خالی از راست',
    },
    goal: `forall l1 l2: list nat, rev (l1 ++ l2) = rev l2 ++ rev l1`,
  },
  {
    context: baseContext,
    statement: s[4],
    pallete: {
      'esteghra': 'استقرا',
    },
    goal: `forall P: nat -> Prop,
    (forall x: nat, (forall y: nat, y < x -> P y) -> P x)
    -> forall n: nat, P n`,
  },
]