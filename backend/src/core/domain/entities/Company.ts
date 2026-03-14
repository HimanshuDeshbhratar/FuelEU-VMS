/**
 * Company Entity
 * Ship operator entity
 */

export class Company {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly registrationNumber: string,
    private readonly email: string,
    private readonly country: string
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Company ID is required');
    }
    if (!name || name.trim().length === 0) {
      throw new Error('Company name is required');
    }
  }

  static create(
    id: string,
    name: string,
    registrationNumber: string,
    email: string,
    country: string
  ): Company {
    return new Company(id, name, registrationNumber, email, country);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getRegistrationNumber(): string {
    return this.registrationNumber;
  }

  getEmail(): string {
    return this.email;
  }

  getCountry(): string {
    return this.country;
  }

  equals(other: Company): boolean {
    return this.id === other.id;
  }
}



