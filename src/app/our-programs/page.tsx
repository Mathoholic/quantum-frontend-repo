import ProgramHero from "@/components/program/Toddler-Playgroup";
import ProgramSection from "@/components/program/Nursery-LKG";
import UKGDaycareInfo from "@/components/program/UKG-Daycare";
import AfterSchoolPrograms from "@/components/program/AfterSchool";

export default function Home() {
  return (
    <div>
      <ProgramHero />
      <ProgramSection />
      <UKGDaycareInfo />
      <AfterSchoolPrograms />
    </div>
  );
}
