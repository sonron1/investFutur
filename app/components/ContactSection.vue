
<template>
  <section id="contact" class="py-5 bg-light">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
          <h2 class="section-title">Nous contacter</h2>
          <p class="section-description">
            Notre équipe d'experts est à votre disposition
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="row g-4">
            <div class="col-md-4 text-center" data-aos="fade-up">
              <div class="contact-item">
                <div class="contact-icon mb-3">
                  <i class="fas fa-phone fa-2x text-primary"></i>
                </div>
                <h5>Téléphone</h5>
                <p class="text-muted">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
              <div class="contact-item">
                <div class="contact-icon mb-3">
                  <i class="fas fa-envelope fa-2x text-primary"></i>
                </div>
                <h5>Email</h5>
                <p class="text-muted">contact@investfuture.com</p>
              </div>
            </div>

            <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
              <div class="contact-item">
                <div class="contact-icon mb-3">
                  <i class="fas fa-map-marker-alt fa-2x text-primary"></i>
                </div>
                <h5>Adresse</h5>
                <p class="text-muted">75008 Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-item {
  padding: 2rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>